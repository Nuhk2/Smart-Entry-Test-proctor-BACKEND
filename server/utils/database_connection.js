/*global process */
const mongoose = require("mongoose"),
  colors = require("colors");

const initialSetup = () => {
  console.log(colors.bgGreen(colors.black("Doing initial site setups....")));

  process.env.NODE_ENV === "production"
    ? console.log(colors.magenta("Running in production ✓"))
    : process.env.NODE_ENV === "staging"
    ? console.log(colors.brightCyan("Running in staging ✓"))
    : console.log(colors.yellow("Running in development ✓"));
};

let AutoIncrement;

const initMongooseConnection = async () => {
  let conString, options;

  if (process.env.NODE_ENV === "production") {
    conString = process.env.MONGO_PROD_URL;
  } else if (process.env.NODE_ENV === "staging") {
    conString = process.env.MONGO_STAG_URL;
  } else {
    conString = process.env.MONGO_DEV_URL;
  }

  options = {};

  try {
    let mongooseConn = await mongoose.connect(conString, options);

    if (mongooseConn.connection) {
      initialSetup();
      return true;
    } else {
      throw new Error("Mongoose connection was unsuccessful");
    }
  } catch (error) {
    console.error("Mongoose connection error:", error);
    throw error;
  }
};

module.exports = {
  initMongooseConnection,
  AutoIncrement,
};
