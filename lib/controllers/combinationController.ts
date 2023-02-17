import dynamodb from "../utils/dynamodb";
import { success } from "../utils/response";

exports.getTasks = async function (event: any) {
  var params = {
    TableName: "TodoTable",
  };
  var result = await dynamodb.scan(params);
  var params1 = {
    TableName: "TasksTable",
  };
  var result1 = await dynamodb.scan(params1);
  return success(200, {
    todo: result,
    tasks: result1,
  });
};
