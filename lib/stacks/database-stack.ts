import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class DatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    this.createTodoTable();
  }
  createTodoTable() {
    new dynamodb.Table(this, "TodoTable", {
      tableName: "TodoTable",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });
  }
}
