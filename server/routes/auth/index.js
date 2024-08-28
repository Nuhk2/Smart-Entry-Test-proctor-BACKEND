"use strict";

const express = require("express"),
  userAuth = require("../../controllers/auth/user");

const router = express.Router();

router.use("/user", userAuth);

module.exports = router;
