import AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB();
exports.getTasks = async function (event: any) {
  var params = {
    TableName: "TodoTable",
  };
  var result = await dynamoDB.scan(params);
  return result;
};
