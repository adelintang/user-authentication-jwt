const express = require('express');

const router = express.Router();
const { authHandler, tokenHandler, logoutHandler } = require('../controllers/authHandler');

router.post('/login', authHandler);

router.post('/token', tokenHandler);

router.delete('/logout', logoutHandler);

module.exports = router;
