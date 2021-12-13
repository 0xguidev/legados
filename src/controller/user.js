const service = require('../services/user');

const create = async (req, res) => {
    const { name, password, email } = req.body;
    const userData = {
        name,
        password,
        email,
    };

    const { code, message, user } = await service.create(userData);

    if (code !== 201) return res.status(code).json({ message });

    return res.status(code).json({ user });
};

const findAll = async (_req, res) => {
    const user = await service.findAll();

    return res.status(200).json(user);
};

const findById = async (req, res) => {
    const { id } = req.params;

    const { code, message } = await service.findById(id);
    return res.stats(code).json(message);
}

const del = async (req, res) => {
    const { id } = req.params;

    const { err, code } = await service.del(id);
    if (err) return res.status(err.code).json({ message: err.message });
    return res.status(code).json({ message: 'item excluido' });
};

module.exports = {
    create,
    findAll,
    findById,
    del,
}
