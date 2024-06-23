const mongoose = require("mongoose");

const connectMongoDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log(`MongoDb connected`);
  } catch (error) {
    console.error("Error in connecting mongoDb:", error.message);
  }
};

module.exports = connectMongoDB;
