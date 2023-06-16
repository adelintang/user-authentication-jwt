const express = require('express');

const router = express.Router();
const registerHandler = require('../controllers/registerHandler');
const authHandler = require('../controllers/authHandler');
const tokenHandler = require('../controllers/tokenHandler');
const logoutHandler = require('../controllers/logoutHandler');

router.post('/register', registerHandler);
router.post('/login', authHandler);
router.get('/token', tokenHandler);
router.delete('/logout', logoutHandler);

module.exports = router;
