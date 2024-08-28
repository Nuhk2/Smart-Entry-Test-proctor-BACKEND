const mongoose = require("mongoose");
const schemas = require("./schema");

module.exports = {
  User: mongoose.model("User", schemas.User),
  UserSession: mongoose.model("UserSession", schemas.UserSession),
};
