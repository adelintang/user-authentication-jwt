const express = require('express');
const bodyParser = require('body-parser');
const { MongooseConnect } = require('./model/User');

const app = express();
const port = 5000;

require('dotenv').config();

// connect to mongoDB
MongooseConnect();

app.use(bodyParser.json());

app.use('/register', require('./routes/register'));

// auth | logout
app.use('/', require('./routes/auth'));

app.use('/user', require('./routes/user'));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
