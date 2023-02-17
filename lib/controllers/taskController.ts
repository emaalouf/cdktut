import dynamodb from "../utils/dynamodb";
import { success } from "../utils/response";

exports.getTasks = async function (event: any) {
  var params = {
    TableName: "TodoTable",
  };
  var result = await dynamodb.scan(params);
  return success(200, result);
};

exports.deleteTasks = async function (event: any) {
  var params = {
    TableName: "TodoTable",
    Key: {
      id: event.queryStringParameters.id,
    },
  };
  var result = await dynamodb.deleteItem(params);
  return success(200, result);
};

exports.createTasks = async function (event: any) {
  var params = {
    TableName: "TodoTable",
    Item: {
      id: event.queryStringParameters.id,
      title: event.queryStringParameters.Location,
      description: event.queryStringParameters.Name,
    },
    ConditionExpression: "attribute_not_exists(id)",
  };
  var result = await dynamodb.put(params);
  return success(200, result);
  // return success(200, result);
};

exports.editTasks = async function (event: any) {
  // console.log(event);
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
  // return success(200, "");
};
