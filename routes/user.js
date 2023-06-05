const express = require('express');

const router = express.Router();
const user = require('../controllers/user');
const authentication = require('../middleware/authentication');

router.get('/', authentication, user);

module.exports = router;
