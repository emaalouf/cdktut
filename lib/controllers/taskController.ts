exports.getTasks = async function (event: any) {
  var object = {
    name: 'Mohamad',
    age: 20,
    email: 'efpyi@example.com',
    phone: '08000000000',
    address: 'Mohamad, Karachi',
  }
  return {
    statusCode: 200,
    body: JSON.stringify(object),
  };
};
