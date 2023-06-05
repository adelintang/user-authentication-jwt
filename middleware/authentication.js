const jwt = require('jsonwebtoken');

const authentication = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === null) return res.sendStatus(401).end();

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      // console.log(err);
      if (err) throw err;
      req.user = user;
      console.log(req.user);

      next();
    });
  } catch (err) {
    return res.sendStatus(403).end();
  }
};

module.exports = authentication;
