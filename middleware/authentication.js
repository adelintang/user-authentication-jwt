const jwt = require('jsonwebtoken');
const response = require('../helpers/response');

const authentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const accesToken = token.split(' ')[1];

    jwt.verify(accesToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) throw err;
      req.user = user;

      next();
    });
  } catch (err) {
    return response(403, 'fail', { message: `${err.message}` }, res);
  }
};

module.exports = authentication;
