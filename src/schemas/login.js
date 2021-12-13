const jwt = require('jsonwebtoken');
const { findByEmail } = require('../models/login');

const invalid = 'Invalid entries. Try again.';
const alreadyExists = 'Email already registered';
const allFields = 'All fields must be filled';
const incorrectData = 'Incorrect username or password';

const codes = {
    ok: 200,
    created: 201,
    BadRequest: 400,
    conflict: 409,
    Unauthorized: 401,
};

const isBlank = (value) => (!value);
const isEmailValid = (value) => new RegExp(/[\w]+@[\w]+\.[\w]{3,}/g).test(value);

const loginValidate = (email, password) => {
    if (isBlank(email)) return { code: codes.Unauthorized, message: allFields };
    if (isBlank(password)) return { code: codes.Unauthorized, message: allFields };
    if (!isEmailValid(email)) return { code: codes.Unauthorized, message: incorrectData };
    return false;
};

const tokenGenerate = (user) => {
    const tokenPass = 'tokenPassword';
    return jwt.sign({ data: user }, tokenPass);
  };

const validateLoginData = async (email, password) => {
    const { code, message } = loginValidate(email, password);
    if (code) return { code, message };
    const userData = await findByEmail(email);
    if (!userData) return { code: codes.Unauthorized, message: incorrectData };
    if (userData.password !== password) return { code: codes.Unauthorized, message: incorrectData };
    const token = tokenGenerate(userData);
    return { code: codes.ok, message: token };
};

module.exports = {
    validateLoginData,
  };