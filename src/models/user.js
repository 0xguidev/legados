const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, email, password) => {
    const myDB = await connection();
    const { insertedId } = await myDB.collection('users')
        .insertOne({ name, email, password });

    return {
        user: {
            _id: insertedId,
            name,
            email,
            role: 'user',
        },
    };
};

const findAll = async () => {
    const myDb = await connection();
    const allUsers = await myDb.collection('users').find({}).toArray();

    return allUsers;
};

const findById = async (id) => {
    const myDb = await connection();
    const user = await myDb.collection('users').findOne(new ObjectId(id));

    if (!user) return null;
    return user;
};

const findByEmail = async (email) => {
    const myDb = await connection();
    const isUniq = myDb.collection('users').findOne({ email });
    return isUniq;
};

const del = async (id) => {
    const filter = { _id: ObjectId(id) };
    const myDb = await connection();
    const deleted = await myDb.collection('users').deleteOne(filter);
  
    return deleted.result.ok;
  };

module.exports = {
    create,
    findByEmail,
    findAll,
    findById,
    del
}