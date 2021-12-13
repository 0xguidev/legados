const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByEmail = async (email) => {
    const myDb = await connection();
    const isUniq = myDb.collection('users').findOne({ email });
    return isUniq;
  };

module.exports = {
    findByEmail,
};