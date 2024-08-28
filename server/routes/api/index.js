"use strict";

const express = require("express");
const apiController = require("../../controllers/api/index");
const { authenticateUserSession } = require("../../middleware/user/auth.js");

let router = express.Router();

// router.use("/public", apiController);

router.use("/", authenticateUserSession, apiController);

module.exports = router;
