const { findByEmail } = require('../models/user');

const invalid = 'Invalid entries. Try again.';
const alreadyExists = 'Email already registered';
const codes = {
  ok: 200,
  created: 201,
  BadRequest: 400,
  conflict: 409,
  Unauthorized: 401,
};

const isBlank = (value) => (!value);
const isNotString = (value) => (typeof value !== 'string');
const isEmailValid = (value) => new RegExp(/[\w]+@[\w]+\.[\w]{3,}/g).test(value);

const alreadExistis = async (value) => {
    const Exists = await findByEmail(value);
    if (Exists) return false;
    return true;
};

const isValidNameAndPass = (value) => {
    if (isBlank(value)) return false;
    if (isNotString(value)) return false;
    return true;
};

const emailValidate = (value) => {
    if (isBlank(value)) return false;
    if (isNotString(value)) return false;
    if (!isEmailValid(value)) return false;
    return true;
};

const validateUserData = async (name, email, password) => {
    if (!(await alreadExistis(email))) {
        return { code: codes.conflict, message: alreadyExists };
    }

    if (!isValidNameAndPass(name) || !isValidNameAndPass(password)) {
        return { code: codes.BadRequest, message: invalid };
    }

    if (!emailValidate(email)) {
        return { code: codes.BadRequest, message: invalid };
    }

    return { code: codes.created };
};
module.exports = {
    validateUserData
}