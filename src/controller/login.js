const service = require('../services/login');

const login = async (req, res) => {
    const { email, password } = req.body;
    const { code, message } = await service.login(email, password);
    if (code === 200) return res.status(code).json({ token: message });
    return res.status(code).json({ message });
  };

module.exports = { login };