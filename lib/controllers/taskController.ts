import dynamodb from "../utils/dynamodb";
import { success } from "../utils/response";

exports.getTasks = async function (event: any) {
  var params = {
    TableName: "TodoTable",
  };
  var result = await dynamodb.scan(params);
  return success(200, result);
};

exports.deleteTask = async function (event: any) {
  var params = {
    TableName: "TodoTable",
    Key: {
      id: event.pathParameters.id,
    },
  };
  var result = await dynamodb.deleteItem(params);
  return success(200, result);
};

exports.editTask = async function (event: any) {
  var params = {
    TableName: "TodoTable",
    Key: {
      id: event.pathParameters.id,
    },
    UpdateExpression: "SET id = :id, occupation = :occupation",
    ExpressionAttributeValues: {
      ":id": event.body.id,
      ":occupation": event.body.occupation,
    },
    ReturnValues: "ALL_NEW",
  };
  var result = await dynamodb.updateItem(params);
  return success(200, result);
};
