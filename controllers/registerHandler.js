const bcrypt = require('bcrypt');
const response = require('../utils/response');
const { User } = require('../model/User');

const registerHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return response(400, 'fail', { message: 'username and password are required' }, res);

  const users = await User.find({});
  const duplicate = users.find((user) => user.username === username);

  if (duplicate) return response(409, 'fail', { message: 'username conflict or duplicate' }, res);

  try {
    // encrypt the password
    const hashPassword = await bcrypt.hash(password, 10);
    // store the new user
    // const newUser = { "user": user, "pass": hashPass };
    // usersDB.setUsers([...usersDB.users, newUser]);

    const result = new User({
      username, password: hashPassword,
    });

    const { _id } = await result.save();

    response(200, 'succes', { message: 'berhasil menambahkan user', data: { userId: _id } }, res);
  } catch (err) {
    response(500, 'fail', { message: `${err.message}` }, res);
  }
};

module.exports = registerHandler;
