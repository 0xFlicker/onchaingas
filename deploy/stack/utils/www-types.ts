import type {
  CloudFrontRequest,
  CloudFrontEvent,
  CloudFrontResponse,
} from "aws-lambda";
import { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "http";

export declare type OriginRequestApiHandlerManifest = ApiManifest & {
  enableHTTPCompression?: boolean;
};
export declare type OriginRequestDefaultHandlerManifest = PageManifest & {
  logLambdaExecutionTimes?: boolean;
  enableHTTPCompression?: boolean;
  regenerationQueueName?: string;
  disableOriginResponseHandler?: boolean;
};
export declare type OriginRequestImageHandlerManifest = {
  enableHTTPCompression?: boolean;
  domainRedirects?: {
    [key: string]: string;
  };
};
export declare type OriginRequestEvent = {
  Records: [
    {
      cf: {
        request: CloudFrontRequest;
        config: CloudFrontEvent["config"];
      };
    }
  ];
};
export declare type OriginResponseEvent = {
  Records: [
    {
      cf: {
        request: CloudFrontRequest;
        response: CloudFrontResponse;
        config: CloudFrontEvent["config"];
      };
    }
  ];
};
export interface OriginRegenerationEvent {
  pagePath: string;
  basePath: string | undefined;
  region: string;
  bucketName: string;
  pageS3Path: string;
  cloudFrontEventRequest: AWSLambda.CloudFrontRequest;
}

export declare type Header = {
  key?: string;
  value: string;
};
export declare type Headers = {
  [key: string]: Header[];
};
export declare type Request = {
  headers: Headers;
  querystring?: string;
  uri: string;
};
export declare type Event = {
  req: IncomingMessage;
  res: ServerResponse;
  responsePromise: Promise<any>;
};
export declare type RedirectData = {
  statusCode: number;
  source: string;
  destination: string;
  internal?: boolean;
};
export declare type RewriteData = {
  source: string;
  destination: string;
};
export declare type DynamicRoute = {
  route: string;
  regex: string;
};
export declare type Dynamic = {
  file: string;
  regex: string;
};
export declare type DynamicSSG = {
  fallback: false | null | string;
};
export declare type NonDynamicSSG = {
  initialRevalidateSeconds: false | number;
  srcRoute: string | null;
};
export declare type Manifest = {
  authentication?: {
    username: string;
    password: string;
  };
  domainRedirects?: {
    [key: string]: string;
  };
  publicFiles?: {
    [key: string]: string;
  };
  trailingSlash?: boolean;
};
export declare type ApiManifest = Manifest & {
  apis: {
    dynamic: Dynamic[];
    nonDynamic: {
      [key: string]: string;
    };
  };
};
export declare type PageManifest = Manifest & {
  buildId: string;
  pages: {
    dynamic: DynamicRoute[];
    html: {
      dynamic: {
        [key: string]: string;
      };
      nonDynamic: {
        [key: string]: string;
      };
    };
    ssg: {
      dynamic: {
        [key: string]: DynamicSSG;
      };
      nonDynamic: {
        [key: string]: NonDynamicSSG;
      };
      notFound?: {
        [key: string]: true;
      };
    };
    ssr: {
      dynamic: {
        [key: string]: string;
      };
      nonDynamic: {
        [key: string]: string;
      };
    };
  };
  publicFiles: {
    [key: string]: string;
  };
  trailingSlash: boolean;
  hasApiPages: boolean;
};
export declare type HeaderData = {
  source: string;
  headers: Header[];
};
export declare type DomainData = {
  domain: string;
  defaultLocale: string;
  locales?: string[];
};
export declare type I18nData = {
  locales: string[];
  defaultLocale: string;
  localeDetection?: boolean;
  domains?: DomainData[];
};
export declare type RoutesManifest = {
  basePath: string;
  redirects: RedirectData[];
  rewrites: RewriteData[];
  headers: HeaderData[];
  i18n?: I18nData;
};
export declare type PrerenderManifest = {
  preview: {
    previewModeId: string;
    previewModeSigningKey: string;
    previewModeEncryptionKey: string;
  };
};
export interface AnyRoute {
  file?: string;
  headers?: Headers;
  querystring?: string;
  statusCode?: number;
  isApi?: boolean;
  isExternal?: boolean;
  isPublicFile?: boolean;
  isNextStaticFile?: boolean;
  isRedirect?: boolean;
  isRender?: boolean;
  isStatic?: boolean;
  isUnauthorized?: boolean;
}
export interface ApiRoute extends AnyRoute {
  isApi: true;
  page: string;
}
export interface ExternalRoute extends AnyRoute {
  isExternal: true;
  path: string;
}
export interface PublicFileRoute extends AnyRoute {
  isPublicFile: true;
  file: string;
}
export interface NextStaticFileRoute extends AnyRoute {
  isNextStaticFile: true;
  file: string;
}
export interface RedirectRoute extends AnyRoute {
  isRedirect: true;
  status: number;
  statusDescription: string;
}
export interface RenderRoute extends AnyRoute {
  isRender: true;
  isData: boolean;
  page: string;
}
export interface StaticRoute extends AnyRoute {
  isStatic: true;
  isData: boolean;
  file: string;
  page?: string;
  revalidate?: false | number;
  fallback?: false | null | string;
}
export interface UnauthorizedRoute extends AnyRoute {
  isUnauthorized: true;
  status: number;
  statusDescription: string;
  body: string;
}
export declare type DataRoute = (RenderRoute | StaticRoute) & {
  isData: true;
};
export declare type PageRoute = (RenderRoute | StaticRoute) & {
  isData: false;
};
export declare type Route =
  | ExternalRoute
  | PublicFileRoute
  | NextStaticFileRoute
  | RedirectRoute
  | RenderRoute
  | StaticRoute
  | ApiRoute
  | UnauthorizedRoute;
export declare type PreRenderedManifest = {
  version: 2;
  routes: {
    [route: string]: {
      initialRevalidateSeconds: number | false;
      srcRoute: string | null;
      dataRoute: string;
    };
  };
  dynamicRoutes: {
    [route: string]: {
      routeRegex: string;
      fallback: string | false;
      dataRoute: string;
      dataRouteRegex: string;
    };
  };
  preview: {
    previewModeId: string;
    previewModeSigningKey: string;
    previewModeEncryptionKey: string;
  };
};
export declare type PerfLogger = {
  now: () => number | undefined;
  log: (metricDescription: string, t1?: number, t2?: number) => void;
};
export declare type RegenerationEventRequest = {
  url: string | undefined;
  headers: IncomingHttpHeaders;
};
export declare type RegenerationEvent = {
  request: RegenerationEventRequest;
  pagePath: string;
  basePath: string;
  pageKey: string;
  storeName: string;
  storeRegion: string;
};
export declare type ImageBuildManifest = {
  domainRedirects?: {
    [key: string]: string;
  };
};
export declare type CoreBuildOptions = {
  nextConfigDir?: string;
  nextStaticDir?: string;
  outputDir?: string;
  args?: string[];
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  cmd?: string;
  domainRedirects?: {
    [key: string]: string;
  };
  minifyHandlers?: boolean;
  handler?: string;
  authentication?:
    | {
        username: string;
        password: string;
      }
    | undefined;
  baseDir?: string;
  cleanupDotNext?: boolean;
  assetIgnorePatterns?: string[];
};
