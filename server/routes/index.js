"use strict";
const bodyParser = require("body-parser"),


  loginRoute = require("./auth"),
  apiRoute = require("./api/index"),
  userRoutes = require("./api/userRoutes");
  const chatbotRoutes = require('./api/chatbotRoutes');

const init = (server) => {
  // ------- parse every request body to lowercase
  server.use(function (req, res, next) {
    for (let key in req.query) {
      req.query[key.toLowerCase()] = req.query[key];
    }
    for (let key in req.body) {
      req.body[key.toLowerCase()] = req.body[key];
    }
    next();
  });

  // -----------------  parse application/json
  server.use(bodyParser.json());

  server.use("/", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE ,OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Authorization"
    );
    next();
  });

  server.get("/", function (req, res) {
    res.send("<---Server Running --->");
  });

  server.use("/api", apiRoute);
  server.use("/auth", loginRoute);
  server.use("/api/users", userRoutes);
  server.use('/api', chatbotRoutes);
};

module.exports = {
  init,
};
