import dynamodb from "../utils/dynamodb";
import { success } from "../utils/response";

exports.getTasks = async function (event: any) {
  var params = {
    TableName: "TodoTable",
  };
  var result = await dynamodb.scan(params);
  return success(200, result);
};
