interface Response {
  statusCode: Number;
  body: any;
}
export function success(statusCode: Number, data: any = {}) {
  return buildResponse(statusCode, data);
}
export function failure(statusCode: Number, data: any = {}) {
  return buildResponse(statusCode, data);
}
function buildResponse(statusCode: Number, data: any): Response {
  var body = JSON.stringify(data);
  return {
    statusCode,
    body,
  };
}
