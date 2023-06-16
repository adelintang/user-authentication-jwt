const mongoose = require('mongoose');

const MongooseConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connection to mongodb successfully');
  } catch (err) {
    console.log(`${err.name}: ${err.message}`);
  }
};

module.exports = MongooseConnect;
