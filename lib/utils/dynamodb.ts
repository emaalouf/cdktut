import AWS = require("aws-sdk");
const client = new AWS.DynamoDB.DocumentClient();
export default {
  get: (params: AWS.DynamoDB.DocumentClient.GetItemInput) =>
    new Promise(function (resolve, reject) {
      client.get(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
  put: (params: AWS.DynamoDB.DocumentClient.PutItemInput) =>
    new Promise(function (resolve, reject) {
      client.put(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
  query: (params: AWS.DynamoDB.DocumentClient.QueryInput) =>
    new Promise(function (resolve, reject) {
      client.query(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
  scan: (params: AWS.DynamoDB.DocumentClient.QueryInput) =>
    new Promise(function (resolve, reject) {
      client.scan(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
  updateItem: (params: AWS.DynamoDB.DocumentClient.UpdateItemInput) =>
    new Promise(function (resolve, reject) {
      client.update(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
  deleteItem: (params: AWS.DynamoDB.DeleteItemInput) =>
    new Promise(function (resolve, reject) {
      client.delete(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
  transactWrite: (params: AWS.DynamoDB.TransactWriteItemsInput) =>
    new Promise(function (resolve, reject) {
      client.transactWrite(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
  batchWrite: (params: AWS.DynamoDB.BatchWriteItemInput) =>
    new Promise(function (resolve, reject) {
      client.batchWrite(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }),
};
