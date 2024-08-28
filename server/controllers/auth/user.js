"use strict";
const express = require("express");
const userAuthService = require("../../services/auth/user");
const router = express.Router();

router.post("/login", userAuthService.userLogin);
router.post("/register", userAuthService.userRegistration);
router.post("/forgot-password", userAuthService.forgotPassword);
router.post("/reset-password", userAuthService.resetPassword);

module.exports = router;
