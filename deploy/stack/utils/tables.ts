import { Construct } from "constructs";
import * as cr from "aws-cdk-lib/custom-resources";
import * as ssm from "aws-cdk-lib/aws-ssm";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as sns from "aws-cdk-lib/aws-sns";

export const getSnsTopic = (
  ctx: Construct,
  topicName: string,
  region: string
) => {
  const topicArnParam = new cr.AwsCustomResource(ctx, `${topicName}ArnParam`, {
    onUpdate: {
      // will also be called for a CREATE event
      service: "SSM",
      action: "getParameter",
      parameters: {
        Name: `${topicName}_TopicArn`,
        WithDecryption: true,
      },
      region,
      physicalResourceId: cr.PhysicalResourceId.of(Date.now().toString()), // Update physical id to always fetch the latest version
    },
    policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
      resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
    }),
  });

  const topicArn = topicArnParam.getResponseField("Parameter.Value");
  const topic = sns.Topic.fromTopicArn(ctx, topicName, topicArn);
  return topic;
};

export const getTable = (
  ctx: Construct,
  tableName: string,
  {
    globalIndexes,
    localIndexes,
  }: { globalIndexes?: string[]; localIndexes?: string[] } = {}
) => {
  const tableArnParam = new cr.AwsCustomResource(ctx, `${tableName}ArnParam`, {
    onUpdate: {
      // will also be called for a CREATE event
      service: "SSM",
      action: "getParameter",
      parameters: {
        Name: `${tableName}_TableArn`,
        WithDecryption: true,
      },
      region: "us-east-2",
      physicalResourceId: cr.PhysicalResourceId.of(Date.now().toString()), // Update physical id to always fetch the latest version
    },
    policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
      resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
    }),
  });

  const tableArn = tableArnParam.getResponseField("Parameter.Value");
  const table = dynamodb.Table.fromTableAttributes(ctx, tableName, {
    tableArn,
    globalIndexes,
    localIndexes,
  });

  return table;
};

export const getTableNameParam = (ctx: Construct, uniqueParamName: string) => {
  // Fetch table names from SSM Parameter Store
  const tableNamesParamResource = new cr.AwsCustomResource(
    ctx,
    "TableNamesParamResource",
    {
      onUpdate: {
        // will also be called for a CREATE event
        service: "SSM",
        action: "getParameter",
        parameters: {
          Name: "DynamoDB_TableNames",
        },
        region: "us-east-2",
        physicalResourceId: cr.PhysicalResourceId.of(Date.now().toString()), // Update physical id to always fetch the latest version
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({
        resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE,
      }),
    }
  );
  const tableNamesParamValue =
    tableNamesParamResource.getResponseField("Parameter.Value");
  const tableNamesParam = new ssm.StringParameter(ctx, "TableNamesParam", {
    parameterName: uniqueParamName,
    stringValue: tableNamesParamValue,
  });
  return tableNamesParam;
};
