/* global process */
"use strict";
require("dotenv").config();
const cors = require("cors"),
  express = require("express"),
  bodyParser = require("body-parser"),
  routes = require("./routes"),
  colors = require("colors"),
  morgan = require("morgan"),
  http = require("http"),
  config = require("../config/local"),
  mongooseInit = require("../server/utils/database_connection");

let server = express(),
  create,
  start;
// ------ create
const app = http.createServer(server);

create = () => {
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(
    cors({
      origin: "*",
    })
  );
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  //---------------  setup public directory
  server.use(express.static("public"));

  server.use(morgan("dev"));
  // ------------- Set up routes and webhooks
  routes.init(server);

  // server.use("/webhook", webhook);

  // ---------------  Initiating mongoose connection
  mongooseInit
    .initMongooseConnection()
    .then((connected) => {
      const environment =
        process.env.NODE_ENV === config.environment.production
          ? config.environment.production
          : process.env.NODE_ENV === config.environment.staging
          ? config.environment.staging
          : config.environment.development;

      const statusMessage = connected
        ? colors.green(
            `Mongoose connection to --- ${environment}---- successful`
          )
        : colors.red("Mongoose connection was unsuccessful");

      console.log(statusMessage);
    })
    .catch((error) => {
      console.error("Error during Mongoose connection:", error);
    });
};

start = function () {
  app.listen(process.env.PORT, function () {
    console.log(
      `Starting Backend Server at: ${process.env.HOST} : ${process.env.PORT}`
    );
  });
};

module.exports = {
  create,
  start,
};
