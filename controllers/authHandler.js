const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../helpers/response');
const User = require('../model/User');
const generateAccessToken = require('../helpers/generateAccessToken');

const authHandler = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return response(400, 'fail', { message: 'username and password are required' }, res);

  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    return response(401, 'fail', { message: 'user not found' }, res); // 401 unauthorized
  }

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    const name = { name: foundUser.username };
    const accesToken = generateAccessToken(name);
    const refreshToken = jwt.sign(name, process.env.REFRESH_TOKEN_SECRET);

    await User.updateOne({ username: foundUser.username }, { refreshToken });

    res.cookie('token', refreshToken, { httpOnly: true, sameSite: 'None' });
    response(200, 'sucess', { message: `user ${username} is Logged in`, data: { accesToken } }, res);
  } else {
    response(401, 'fail', { message: 'user Unauthorized' }, res);
  }
};

module.exports = authHandler;
