import dynamodb from "../utils/dynamodb";
import { success } from "../utils/response";

exports.getTasks = async function (event: any) {
  var params = {
    TableName: "TodoTable",
  };
  var params1 = {
    TableName: "TasksTable",
  };
  var result = await dynamodb.scan(params);
  var result1 = await dynamodb.scan(params1);
  return success(200, {
    todo: result,
    tasks: result1,
  });
};

exports.deleteTasks = async function (event: any) {
  console.log("event : ", event)
  const body = JSON.parse(event.body)
  var params = {
    TableName: "TasksTable",
    Key: {
      id: body.id,
    },
  };
  var result = await dynamodb.deleteItem(params);
  return success(200, result);
};

exports.createTasks = async function (event: any) {
  console.log("event : ", event);
  const body = JSON.parse(event.body)
  var params = {
    TableName: "TasksTable",
    Item: {
      id: body.id,
    },
  };
  console.log(params)
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
