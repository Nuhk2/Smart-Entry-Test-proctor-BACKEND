"use strict";

require("dotenv").config();

module.exports = {
  jwtSecret_user: "very-very-secret-key",
  // --------------- development environment
  environment: {
    development: "development",
    production: "production",
    staging: "staging",
  },

  // ------------- role in system
  role: {
    admin: "admin",
    teacher: "teacher",
    student: "student",
  },

  // ----------- account statuses in system
  status: {
    verified: "verified",
    unverified: "unverified",
  },

  imagesDir: {
    USER_PROFILE_IMAGE: {
      dir: "user_profile_images",
      url: "user_profile_images",
      defaultImage: "upload/user_images/default.png",
    },
  },
};
