const jwt = require('jsonwebtoken');
const response = require('../helpers/response');
const User = require('../model/User');
const generateAccessToken = require('../helpers/generateAccessToken');

const tokenHandler = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return response(401, 'fail', { message: 'User Unauthorized' }, res);
  }

  const refreshToken = token;
  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    return response(403, 'fail', { message: 'Forbidden for user' }, res);
  }

  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return response(403, 'fail', { message: `${err.message}` }, res);
      }

      const accesToken = generateAccessToken({ name: user.name });
      res.json({ accesToken });
    });
  } catch (err) {
    response(403, 'fail', { message: `${err.message}` }, res);
  }
};

module.exports = tokenHandler;
