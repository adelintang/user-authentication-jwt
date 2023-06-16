const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const MongooseConnect = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

// connect to mongoDB
MongooseConnect();

app.use(bodyParser.json());

app.use(cookieParser());

// auth routes
app.use(authRoutes);

// route user akses
app.use('/user', require('./routes/user'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
