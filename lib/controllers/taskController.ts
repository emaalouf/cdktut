import dynamodb from "../utils/dynamodb";

exports.getTasks = async function (event: any) {
  var params = {
    TableName: "TodoTable",
  };
  var result = await dynamodb.scan(params);
  return {
    statusCode: 200,
    body: result,
  };
};
