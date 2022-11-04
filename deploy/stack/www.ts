import path from "path";
import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as logs from "aws-cdk-lib/aws-logs";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as patterns from "aws-cdk-lib/aws-route53-patterns";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambdaEventSources from "aws-cdk-lib/aws-lambda-event-sources";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import {
  CorsHttpMethod,
  HttpApi,
  HttpMethod,
} from "@aws-cdk/aws-apigatewayv2-alpha";
import { fileURLToPath } from "url";
import { Duration, RemovalPolicy } from "aws-cdk-lib";
import { readAssetsDirectory } from "./utils/readAssetsDir.js";
import pathToPosix from "./utils/pathToPosix.js";
import { getTable, getTableNameParam } from "./utils/tables.js";
import {
  readApiBuildManifest,
  readDefaultManifest,
  readImageBuildManifest,
  readPrerenderManifest,
  readRoutesManifest,
} from "./utils/www-manifest.js";
import { readInvalidationPathsFromManifest } from "./utils/readInvalidationPathsFromManifest.js";
import { reduceInvalidationPaths } from "./utils/reduceInvalidationPaths.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface IProps extends cdk.StackProps {
  readonly domain: [string, string] | string;
  readonly serverlessBuildOutDir: string;
  readonly withLogging?: boolean;
  readonly whiteListedCookies?: string[];
  readonly whiteListedHeaders?: string[];
}

export class WwwStack extends cdk.Stack {
  readonly api: HttpApi;
  constructor(scope: cdk.Stage, id: string, props: IProps) {
    const {
      domain,
      serverlessBuildOutDir,
      withLogging = false,
      whiteListedCookies = [],
      whiteListedHeaders = [],
      ...rest
    } = props;
    super(scope, id, rest);
    // Read some configs
    const apiBuildManifest = readApiBuildManifest(serverlessBuildOutDir);
    const routesManifest = readRoutesManifest(serverlessBuildOutDir);
    const imagesManifest = readImageBuildManifest(serverlessBuildOutDir);
    const defaultManifest = readDefaultManifest(serverlessBuildOutDir);
    const prerenderManifest = readPrerenderManifest(serverlessBuildOutDir);

    const publicAssetsBucket = new s3.Bucket(this, "PublicAssets", {
      publicReadAccess: false, // CloudFront/Lambdas are granted access so we don't want it publicly available
      // Given this resource is created internally and also should only contain
      // assets uploaded by this library we should be able to safely delete all
      // contents along with the bucket its self upon stack deletion.
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const hasISRPages = Object.keys(prerenderManifest.routes).some(
      (key) =>
        typeof prerenderManifest.routes[key].initialRevalidateSeconds ===
        "number"
    );

    const hasDynamicISRPages = Object.keys(
      prerenderManifest.dynamicRoutes
    ).some((key) => prerenderManifest.dynamicRoutes[key].fallback !== false);

    let regenerationQueue: sqs.Queue | undefined = undefined;
    let regenerationFunction: lambda.Function | undefined = undefined;
    if (hasISRPages || hasDynamicISRPages) {
      regenerationQueue = new sqs.Queue(this, "RegenerationQueue", {
        queueName: `${publicAssetsBucket.bucketName}.fifo`,
        fifo: true,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });
      regenerationFunction = new lambda.Function(this, "RegenerationFunction", {
        handler: "index.handler",
        code: lambda.Code.fromAsset(
          path.join(serverlessBuildOutDir, "regeneration-lambda")
        ),
        runtime: lambda.Runtime.NODEJS_16_X,
        memorySize: 256,
        timeout: cdk.Duration.seconds(30),
      });
      regenerationFunction.addEventSource(
        new lambdaEventSources.SqsEventSource(regenerationQueue)
      );
      publicAssetsBucket.grantReadWrite(regenerationFunction);
    }

    // Domain
    const domains = domain instanceof Array ? domain : [domain];
    const domainName = domains.join(".");
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: domains.length === 2 ? domains[1] : domains[0],
    });

    const certificate = new acm.DnsValidatedCertificate(this, "certificate", {
      domainName,
      hostedZone,
      region: props.env?.region,
    });
    const wwwCertificate = new acm.DnsValidatedCertificate(
      this,
      "www-certificate",
      {
        domainName: `www.${domainName}`,
        hostedZone,
        region: props.env?.region,
      }
    );

    let apiHandler: lambda.Function | undefined = undefined;
    if (apiBuildManifest) {
      apiHandler = new lambda.Function(this, "apiHandler", {
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "index.handler",
        code: lambda.Code.fromAsset(
          path.join(serverlessBuildOutDir, "api-lambda")
        ),
        memorySize: 512,
        timeout: cdk.Duration.seconds(10),
      });
    }
    const defaultHandler = new lambda.Function(this, "defaultHandler", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "index.handler",
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.RETAIN, // retain old versions to prevent premature removal, cleanup via trigger later on
      },
      logRetention: logs.RetentionDays.THREE_DAYS,
      code: lambda.Code.fromAsset(
        path.join(serverlessBuildOutDir, "default-lambda")
      ),
      memorySize: 512,
      timeout: cdk.Duration.seconds(30),
    });
    publicAssetsBucket.grantReadWrite(defaultHandler);
    regenerationQueue?.grantSendMessages(defaultHandler);
    regenerationFunction?.grantInvoke(defaultHandler);

    let imageHandler: lambda.Function | undefined = undefined;
    if (imagesManifest) {
      imageHandler = new lambda.Function(this, "imageHandler", {
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "index.handler",
        currentVersionOptions: {
          removalPolicy: RemovalPolicy.DESTROY, // destroy old versions
          retryAttempts: 1, // async retry attempts
        },
        code: lambda.Code.fromAsset(
          path.join(serverlessBuildOutDir, "image-lambda")
        ),
        memorySize: 512,
        timeout: cdk.Duration.seconds(10),
      });
      publicAssetsBucket.grantReadWrite(imageHandler);
      imageHandler.addAlias("live");
    }

    const defaultCachePolicy = new cloudfront.CachePolicy(
      this,
      "defaultCachePolicy",
      {
        queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
        headerBehavior: cloudfront.CacheHeaderBehavior.none(),
        cookieBehavior: cloudfront.CacheCookieBehavior.none(),
        defaultTtl: Duration.days(30),
        maxTtl: Duration.days(30),
        minTtl: Duration.days(30),
        enableAcceptEncodingBrotli: true,
        enableAcceptEncodingGzip: true,
      }
    );
    const imageCachePolicy = new cloudfront.CachePolicy(
      this,
      "imageCachePolicy",
      {
        queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
        headerBehavior: cloudfront.CacheHeaderBehavior.allowList("Accept"),
        cookieBehavior: cloudfront.CacheCookieBehavior.none(),
        defaultTtl: Duration.days(1),
        maxTtl: Duration.days(365),
        minTtl: Duration.days(0),
        enableAcceptEncodingBrotli: true,
        enableAcceptEncodingGzip: true,
      }
    );
    const permissiveCachePolicy = new cloudfront.CachePolicy(
      this,
      "permissive",
      {
        queryStringBehavior: cloudfront.CacheQueryStringBehavior.all(),
        headerBehavior: props.whiteListedHeaders
          ? cloudfront.CacheHeaderBehavior.allowList(
              ...props.whiteListedHeaders
            )
          : cloudfront.CacheHeaderBehavior.none(),
        cookieBehavior: {
          behavior: props.whiteListedCookies?.length ? "whitelist" : "all",
          cookies: props.whiteListedCookies,
        },
        defaultTtl: Duration.seconds(0),
        maxTtl: Duration.days(365),
        minTtl: Duration.seconds(0),
        enableAcceptEncodingBrotli: true,
        enableAcceptEncodingGzip: true,
      }
    );

    const metadataHandler = new lambda.Function(this, "OnchainGasMetadata", {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset(path.join(__dirname, "../.layers/metadata")),
      handler: "index.handler",
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
    });
    const httpApiMetadata = new HttpApi(this, "http-api-example", {
      description: "This service serves graphql.",
      corsPreflight: {
        allowHeaders: [
          "Content-Type",
          "X-Amz-Date",
          "Authorization",
          "X-Api-Key",
        ],
        allowMethods: [
          CorsHttpMethod.OPTIONS,
          CorsHttpMethod.GET,
          CorsHttpMethod.POST,
        ],
        allowOrigins: ["*"],
      },
    });
    httpApiMetadata.addRoutes({
      path: "/onchaingas/{type}/{tokenId}",
      methods: [HttpMethod.GET, HttpMethod.OPTIONS],
      integration: new HttpLambdaIntegration(
        "MetadataIntegration",
        metadataHandler as any
      ),
    });
    const edgeLambdas: cloudfront.EdgeLambda[] = [
      {
        includeBody: true,
        eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
        functionVersion: defaultHandler.currentVersion,
      },
      {
        eventType: cloudfront.LambdaEdgeEventType.ORIGIN_RESPONSE,
        functionVersion: defaultHandler.currentVersion,
      },
    ];
    const distribution = new cloudfront.Distribution(this, "www", {
      certificate,
      domainNames: [domainName],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_ALL,
      enableLogging: props.withLogging ? true : undefined,
      defaultRootObject: "",
      defaultBehavior: {
        origin: new origins.S3Origin(publicAssetsBucket),
        edgeLambdas,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
        compress: true,
        cachePolicy: permissiveCachePolicy,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      additionalBehaviors: {
        "onchaingas/*": {
          origin: new origins.HttpOrigin(
            cdk.Fn.parseDomainName(httpApiMetadata.url || ""),
            {}
          ),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          cachePolicy: new cloudfront.CachePolicy(this, "apiCacheDisabled", {
            cookieBehavior: cloudfront.CacheCookieBehavior.all(),
            queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
            headerBehavior: cloudfront.CacheHeaderBehavior.allowList(
              "Authorization",
              "Content-Type",
              "Accept"
            ),
          }),
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        ...(imageHandler
          ? {
              "_next/image*": {
                origin: new origins.S3Origin(publicAssetsBucket),
                cachePolicy: imageCachePolicy,
                edgeLambdas: [
                  {
                    functionVersion: imageHandler.currentVersion,
                    eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
                  },
                ],
                viewerProtocolPolicy:
                  cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
              },
            }
          : {}),
        "_next/static/*": {
          origin: new origins.S3Origin(publicAssetsBucket),
          cachePolicy: defaultCachePolicy,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          compress: true,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        "static/*": {
          origin: new origins.S3Origin(publicAssetsBucket),
          cachePolicy: defaultCachePolicy,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          compress: true,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        ...(apiHandler
          ? {
              "api/*": {
                origin: new origins.S3Origin(publicAssetsBucket),
                edgeLambdas: [
                  {
                    functionVersion: apiHandler.currentVersion,
                    includeBody: true,
                    eventType: cloudfront.LambdaEdgeEventType.ORIGIN_REQUEST,
                  },
                ],
                compress: true,
                allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
                cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
                cachePolicy: permissiveCachePolicy,
                viewerProtocolPolicy:
                  cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
              },
            }
          : {}),
        "_next/data/*": {
          origin: new origins.S3Origin(publicAssetsBucket),
          edgeLambdas,
          cachePolicy: permissiveCachePolicy,
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          compress: true,
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        },
        "_next/*": {
          viewerProtocolPolicy:
            cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          origin: new origins.S3Origin(publicAssetsBucket),
          allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
          cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD_OPTIONS,
          compress: true,
          cachePolicy: permissiveCachePolicy,
        },
      },
    });

    const assetsDir = path.join(serverlessBuildOutDir, "assets");
    const { basePath } = routesManifest || {};
    const normalizedBasePath =
      basePath && basePath.length > 0 ? basePath.slice(1) : "";
    const assets = readAssetsDirectory({
      assetsDirectory: path.join(assetsDir, normalizedBasePath),
    });
    new s3deploy.BucketDeployment(this, "AssetDeploymentBuildID", {
      sources: [
        s3deploy.Source.asset(assetsDir, {
          exclude: ["**", "!BUILD_ID"],
        }),
      ],
      destinationBucket: publicAssetsBucket,
      destinationKeyPrefix: "/BUILD_ID",
      distribution,
      distributionPaths: reduceInvalidationPaths(
        readInvalidationPathsFromManifest(defaultManifest)
      ),
    });

    Object.keys(assets).forEach((key) => {
      const { path: assetPath, cacheControl } = assets[key];
      new s3deploy.BucketDeployment(this, `AssetDeployment_${key}`, {
        destinationBucket: publicAssetsBucket,
        sources: [s3deploy.Source.asset(assetPath)],
        cacheControl: [s3deploy.CacheControl.fromString(cacheControl)],

        // The source contents will be unzipped to and loaded into the S3 bucket
        // at the root '/', we don't want this, we want to maintain the same
        // path on S3 as their local path. Note that this should be a posix path.
        destinationKeyPrefix: pathToPosix(path.relative(assetsDir, assetPath)),

        // Source directories are uploaded with `--sync` this means that any
        // files that don't exist in the source directory, but do in the S3
        // bucket, will be removed.
        prune: true,
      });
    });

    new patterns.HttpsRedirect(this, "httpsRedirect", {
      recordNames: [`www.${domainName}`],
      targetDomain: domainName,
      zone: hostedZone,
      certificate: wwwCertificate,
    });

    new route53.ARecord(this, "ipv4-record", {
      zone: hostedZone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });
    new route53.AaaaRecord(this, "ipv6-record", {
      zone: hostedZone,
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });
  }
}
