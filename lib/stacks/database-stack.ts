import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class DatabaseStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);
    this.createTodoTable();
    this.createTasksTable();
  }
  createTodoTable() {
    new dynamodb.Table(this, "TodoTable", {
      tableName: "TodoTable",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });
    dynamodb.Table.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: { name: "gsi1pk", type: dynamodb.AttributeType.NUMBER },
      sortKey: { name: "gsi1sk", type: dynamodb.AttributeType.NUMBER },
    });
  }

  createTasksTable() {
    new dynamodb.Table(this, "TasksTable", {
      tableName: "TasksTable",
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });
    dynamodb.Table.addLocalSecondaryIndex({
      indexName: "LSI1",
      sortKey: { name: "lsi1sk", type: dynamodb.AttributeType.NUMBER },
    });
  }
}
