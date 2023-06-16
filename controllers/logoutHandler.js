const User = require('../model/User');

const logoutHandler = async (req, res) => {
  const { token } = req.cookies;

  if (!token) res.sendStatus(204);

  const refreshToken = token;
  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie('token', { httpOnly: true, sameSite: 'None' });
    res.sendStatus(204);
  }

  try {
    await User.updateOne({ refreshToken }, { refreshToken: '' });
    res.clearCookie('token', { httpOnly: true, sameSite: 'None' });
    res.sendStatus(204);
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
};

module.exports = logoutHandler;
