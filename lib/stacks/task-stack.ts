import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda_node from "aws-cdk-lib/aws-lambda-nodejs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as gateway from "aws-cdk-lib/aws-apigateway";
import * as path from "path";
import { Lazy } from "aws-cdk-lib";
import * as ssm from "aws-cdk-lib/aws-ssm";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class TaskStack extends cdk.Stack {
  api: gateway.RestApi;
  apiCustomAuthorizer: gateway.CfnAuthorizer;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.createApi();
    this.createTaskLambdafunction();
    this.deleteTaskLambdafunction();
    this.editTaskLambdafunction();
    this.newTaskLambdafunction();
    this.newCombinationLambdafunction();
  }
  createApi() {
    this.api = new gateway.RestApi(this, "taskApi", {});
  }
  createTaskLambdafunction() {
    //1- create resource
    const taskResource = this.api.root.addResource("get-task");

    //2- create lambda function

    const getTasksLambdaFn = new lambda_node.NodejsFunction(
      this,
      "getTaskLambdafunction",
      {
        functionName: "getTaskLambdafunction",
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "getTasks",
        entry: path.join(__dirname, "../controllers/taskController.ts"),
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["dynamodb:Scan"],
            resources: [
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable",
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable" +
                "/index/*",
            ],
          }),
          new iam.PolicyStatement({
            actions: ["dynamodb:Scan"],
            resources: [
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable",
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable" +
                "/index/*",
            ],
          }),
        ],
      }
    );
    //3- create method and integration
    taskResource.addMethod(
      "GET",
      new gateway.LambdaIntegration(getTasksLambdaFn, {})
    );
  }

  deleteTaskLambdafunction() {
    const taskResource = this.api.root.addResource("delete-task");

    //2- create lambda function
    const deleteTasksLambdaFn = new lambda_node.NodejsFunction(
      this,
      "deleteTaskLambdafunction",
      {
        functionName: "deleteTaskLambdafunction",
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "deleteTasks",
        entry: path.join(__dirname, "../controllers/taskController.ts"),
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["dynamodb:DeleteItem"],
            resources: [
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable",
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable" +
                "/index/*",
            ],
          }),
        ],
      }
    );

    taskResource.addMethod(
      "DELETE",
      new gateway.LambdaIntegration(deleteTasksLambdaFn, {})
    );
  }

  editTaskLambdafunction() {
    const taskResource = this.api.root.addResource("edit-task");
    const editTasksLambdaFn = new lambda_node.NodejsFunction(
      this,
      "editTaskLambdafunction",
      {
        functionName: "editTaskLambdafunction",
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "editTasks",
        entry: path.join(__dirname, "../controllers/taskController.ts"),
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["dynamodb:PutItem"],
            resources: [
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable",
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable" +
                "/index/*",
            ],
          }),
        ],
      }
    );
    taskResource.addMethod(
      "PUT",
      new gateway.LambdaIntegration(editTasksLambdaFn, {})
    );
  }

  newTaskLambdafunction() {
    const taskResource = this.api.root.addResource("new-task");
    const createTasksLambdaFn = new lambda_node.NodejsFunction(
      this,
      "newTaskLambdafunction",
      {
        functionName: "newTaskLambdafunction",
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "createTasks",
        entry: path.join(__dirname, "../controllers/taskController.ts"),
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["dynamodb:PutItem"],
            resources: [
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable",
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable" +
                "/index/*",
            ],
          }),
        ],
      }
    );
    taskResource.addMethod(
      "POST",
      new gateway.LambdaIntegration(createTasksLambdaFn)
    );
  }

  newCombinationLambdafunction() {
    const taskResource = this.api.root.addResource("combination");
    const GetCombinationTasksLambdaFn = new lambda_node.NodejsFunction(
      this,
      "newCombinationLambdafunction",
      {
        functionName: "newCombinationLambdafunction",
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "createTasks",
        entry: path.join(__dirname, "../controllers/combinationController.ts"),
        initialPolicy: [
          new iam.PolicyStatement({
            actions: ["dynamodb:Scan"],
            resources: [
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable",
              "arn:aws:dynamodb:eu-west-1:257273543479:table/TasksTable" +
                "/index/*",
            ],
          }),
          new iam.PolicyStatement({
            actions: ["dynamodb:Scan"],
            resources: [
              "arn:aws:dynamodb:eu-west-1:291140161924:table/TodoTable",
              "arn:aws:dynamodb:eu-west-1:291140161924:table/TodoTable" +
                "/index/*",
            ],
          }),
        ],
      }
    );
    taskResource.addMethod(
      "GET",
      new gateway.LambdaIntegration(GetCombinationTasksLambdaFn, {})
    );
  }
}
