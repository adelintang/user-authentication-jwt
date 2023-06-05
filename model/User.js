const mongoose = require('mongoose');

const { Schema } = mongoose;

const MongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connection to mongodb successfully');
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
};

const userSchema = new Schema({
  username: String,
  password: String,
  refreshTokens: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = { User, MongooseConnect };
