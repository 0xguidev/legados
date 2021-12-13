const { validateUserData } = require('../schemas/user');
const models = require('../models/user');
const { ObjectId } = require('mongodb');

const create = async ({ name, email, password }) => {
    const { code, message } = await validateUserData(name, email, password);
    if (code !== 201) return { code, message };

    const { user } = await models.create(name, email, password);

    return { code, user };
};

const findAll = async (_req, res) => {
    const user = await models.findAll();

    return user;
};

const findById = async (id) => {
    if (!ObjectId.isValid(id)) {
        return { code: 400, message: 'Invalid id' }
    }
    const user = await models.findById(id);
    if (!user) return { code: 400, message: 'Not User exists' };
    
    return { code: 200, message: user };
}

const del = async (id) => {
    if (!ObjectId.isValid(id)) return { err: { code: 400, message: 'bad request' } };

    const productDeleted = await models.del(id);
    if (productDeleted !== 1) return { err: { code: 400, message: 'bad request' } };
    return { code: 204 };
};

module.exports = {
    create,
    findAll,
    del,
    findById,
}