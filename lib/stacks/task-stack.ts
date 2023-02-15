import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda_node from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TaskStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.createTaskLambdafunction();
  }
  createTaskLambdafunction() {
    const helloworldfn = new lambda_node.NodejsFunction(this, "helloworldfn", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "getTasks",
      entry: path.join(__dirname, "../controllers/taskController.ts"),
    });
  }
}
