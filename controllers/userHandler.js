const response = require('../helpers/response');

const userHandler = (req, res) => {
  const userData = [
    {
      name: 'doni',
      hobbies: 'football',
      age: 23,
    },
    {
      name: 'john',
      hobbies: 'volly',
      age: 24,
    },
    {
      name: 'jovi',
      hobbies: 'football',
      age: 21,
    },
  ];

  try {
    const { name } = req.user;
    const result = userData.find((person) => person.name === name);
    response(200, 'success', { data: result }, res);
  } catch (err) {
    response(404, 'fail', { message: 'data not found' }, res);
  }
};

module.exports = userHandler;
