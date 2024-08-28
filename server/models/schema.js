"use strict";

const config = require("../../config/local"),
  mongoose = require("mongoose"),
  ObjectId = mongoose.Types.ObjectId,
  Schema = mongoose.Schema,
  { validateEmail } = require("../utils/helper");

const imageSchema = new Schema(
  {
    file_name: String,
    file_url: String,
    file_type: String,
  },
  { timestamps: true }
);

const User = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      default: null,
      toLowerCase: true,
    },
    last_name: {
      type: String,
      default: null,
      trim: true,
      toLowerCase: true,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      match: /.+@.+\..+/,
      unique: true,
      trim: true,
      toLowerCase: true,
      validate: [validateEmail, "Please enter a valid email address"],
    },
    phone_no: { type: String, default: null },
    is_disabled: { type: Boolean, default: false },
    role: {
      type: String,
      default: config.role.user,
      trim: true,
      enum: [config.role.admin, config.role.teacher, config.role.student],
    },
    profile_image: {
      type: [imageSchema],
      default: [],
    },
    password: { type: String, default: null },
    description: { type: String, trim: true, default: null, toLowerCase: true },
    password_reset_code: { type: String, default: null },
    password_reset_code_valid_till: { type: Number, default: null },
    is_otp_verified: { type: Boolean, default: false },
    account_verification_code: { type: Number, default: 0 },
    location: { type: String, default: null },
    status: {
      type: String,
      default: config.status.unverified,
      enum: [config.status.unverified, config.status.verified],
    },
  },
  { timestamps: true }
);

// ----------- user session schema
const UserSession = new Schema(
  {
    session_hash: { type: String },
    role: { type: String },
    user_id: { type: ObjectId },
    is_super_admin: { type: Boolean, default: false },
    status: { type: Number },
  },
  { timestamps: true }
);

module.exports = {
  User,
  UserSession,
};
