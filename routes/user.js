const express = require('express');

const router = express.Router();
const userHandler = require('../controllers/userHandler');
const authentication = require('../middleware/authentication');

router.get('/', authentication, userHandler);

module.exports = router;
