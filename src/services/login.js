const schema = require('../schemas/login');

const login = async (email, password) => {
  const { code, message } = await schema.validateLoginData(email, password);
  return { code, message };
};

module.exports = {
  login,
}