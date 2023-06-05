const user = (req, res) => {
  res.status(200).json([
    {
      name: 'johan',
      hobbies: 'football',
    },
    {
      name: 'john',
      hobbies: 'volly',
    },
    {
      name: 'jovi',
      hobbies: 'football',
    },
  ]);
};

module.exports = user;
