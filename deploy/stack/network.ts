import * as cdk from "aws-cdk-lib";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as kms from "aws-cdk-lib/aws-kms";
import * as iam from "aws-cdk-lib/aws-iam";

export interface IProps extends cdk.StackProps {
  readonly domain: string;
}

export class NetworkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: IProps) {
    const { domain, ...rest } = props;
    super(scope, id, rest);

    const hostedZone = new route53.HostedZone(this, "hosted_zone", {
      zoneName: domain,
    });

    const dnssecKey = new kms.Key(this, "signing_key", {
      keyUsage: kms.KeyUsage.SIGN_VERIFY,
      keySpec: kms.KeySpec.ECC_NIST_P256,
    });

    dnssecKey.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: "Allow Route 53 DNSSEC Service",
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal("dnssec-route53.amazonaws.com")],
        actions: ["kms:DescribeKey", "kms:GetPublicKey", "kms:Sign"],
        resources: ["*"],
        conditions: {
          StringEquals: {
            "aws:SourceAccount": cdk.Aws.ACCOUNT_ID,
          },
        },
      })
    );
    dnssecKey.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: "Allow Route 53 DNSSEC to CreateGrant",
        effect: iam.Effect.ALLOW,
        principals: [new iam.ServicePrincipal("dnssec-route53.amazonaws.com")],
        actions: ["kms:CreateGrant"],
        resources: ["*"],
        conditions: {
          StringEquals: {
            "aws:SourceAccount": cdk.Aws.ACCOUNT_ID,
          },
          Bool: {
            "kms:GrantIsForAWSResource": true,
          },
        },
      })
    );

    const keySigningKey = new route53.CfnKeySigningKey(
      this,
      "Route53KeySigningKey",
      {
        hostedZoneId: hostedZone.hostedZoneId,
        keyManagementServiceArn: dnssecKey.keyArn,
        status: "ACTIVE",
        name: `${domain.replace(".", "_")}_DNSSEC`,
      }
    );

    const dnssec = new route53.CfnDNSSEC(this, "dnssec", {
      hostedZoneId: hostedZone.hostedZoneId,
    });

    dnssec.addDependsOn(keySigningKey);
    new cdk.CfnOutput(this, "NameServers", {
      value: cdk.Fn.join(", ", hostedZone.hostedZoneNameServers || []),
    });
  }
}
