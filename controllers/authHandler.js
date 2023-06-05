const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utils/response');
const { User } = require('../model/User');

function generateAccessToken(username) {
  return jwt.sign(username, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

const refreshTokens = async ({ id, refreshToken, getToken }) => {
  try {
    const user = await User.findOne({ _id: id });
    if (!getToken) {
      user.refreshTokens.push(refreshToken);
      await user.save();
    } else {
      return user.refreshTokens;
    }
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
};

const tokenHandler = async (req, res) => {
  const { id, refreshToken } = req.body;

  try {
    if (refreshToken === null) return res.sendStatus(401);
    const tokens = await refreshTokens({ id, getToken: true });

    if (!tokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      const accesToken = generateAccessToken({ name: user.name });
      res.json({ accesToken });
    });
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
};

const logoutHandler = async (req, res) => {
  const { id, refreshToken } = req.body;

  try {
    const user = await User.findOne({ _id: id });
    const removeToken = user.refreshTokens.filter((token) => token !== refreshToken);

    user.refreshTokens = removeToken;
    await user.save();

    res.sendStatus(204);
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
};

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
    const { id } = foundUser;
    const userName = { name: foundUser.userName };
    const accesToken = generateAccessToken(userName);
    const refreshToken = jwt.sign(userName, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens({ id, refreshToken });

    response(200, 'sucess', { message: `user ${username} is Logged in`, data: { accesToken, refreshToken } }, res);
  } else {
    response(401, 'fail', { message: 'user not found' }, res);
  }
};

module.exports = { authHandler, tokenHandler, logoutHandler };
