const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectToDB = async (req, res) => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });

    console.log("Database is connected...");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
  }
};

module.exports = connectToDB;
