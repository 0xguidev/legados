const jwt = require('jsonwebtoken');

const tokenPass = 'tokenPassword';

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, tokenPass);
    const userData = decoded.data;

    return userData;
  } catch (err) {
    return null;
  }
};

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: 'missing auth token' });
    }

    const user = verifyToken(authorization);
    if (!user) {
      return res.status(401).send({ message: 'jwt malformed' });
    }
    req.user = user;

    next();
  } catch (err) {
    res.status(500).end();
  }
};