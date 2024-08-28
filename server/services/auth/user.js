"use strict";

const md5 = require("md5"),
  config = require("../../../config/local"),
  jwt = require("jsonwebtoken"),
  Models = require("../../models/model");

// ------- Generate Random Pin ---------//

function generatePin() {
  let min = 0,
    max = 9999;
  return ("0" + (Math.floor(Math.random() * (max - min + 1)) + min)).substr(-4);
}
// ---- user login end point ---------------
async function userLogin(req, res) {
  try {
    let { email, phone_no, password, role } = req.body;

    let userResponse = await Models.User.findOne({
      $or: [{ email: email?.toLowerCase() }, { phone_no: phone_no }],
      password: md5(password.toString()),
      role,
    });
    if (!userResponse) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (userResponse.status == config.status.unverified) {
      return res.status(400).json({
        success: false,
        message: "Your account is not verified. Please verify your account",
      });
    } else if (userResponse?.is_disable) {
      return res.status(400).json({
        success: false,
        message:
          "Your account has been disabled by Admin; Contact Admin for further Infornation",
      });
    } else if (userResponse.status == config.status.verified) {
      let hash = md5(new Date() + Math.random());
      let token = jwt.sign({ session_hash: hash }, config.jwtSecret_user);

      let data = {
        data: userResponse,
        token,
      };

      await saveNewUserSession(hash, userResponse._id, userResponse.role);
      return res.cookie("auth_token", token).status(200).json({
        success: true,
        message: "Login Succesfull",
        data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Your account has been locked",
      });
    }
  } catch (e) {
    console.error("Exception:", e);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}

const userRegistration = async (req, res) => {
  const { first_name, last_name, email, password, phone_no, gender, role } =
    req.body;

  try {
    const pin = generatePin();

    const userDocument = {
      first_name,
      last_name,
      phone_no,
      password: md5(password),
      gender,
      email: email.toLowerCase(),
      role,
      account_verification_code: pin,
    };

    // Send verification email
    //todo
    // await sendEmail("to", "from", "subject", "text", "html");
    // const emailText = `Please use ${pin} to confirm your account`;
    // const emailHtml = `Please use <strong>${pin}</strong> to confirm your account`;

    const record = new Models.User(userDocument);

    await record.save();

    return res.status(200).json({
      success: true,
      message: "Registration Successful. Please verify your email",
    });
  } catch (error) {
    // Handle errors
    console.error("Error in user registration:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      exception: error.toString(),
    });
  }
};

async function forgotPassword(req, res) {
  try {
    let { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide an email" });
    }

    let user = await Models.User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    let pin = generatePin();

    user.password_reset_code = pin;

    user.password_reset_code_valid_till = new Date(
      new Date().getTime() + 1000 * 60 * 30
    );

    await user.save();

    //send email

    return res.status(200).json({
      success: true,
      message: "Pin sent to your email",
    });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Something went wrong...", error: err });
  }
}

async function resetPassword(req, res) {
  try {
    let { email, new_password } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 400,
        message: "Please provide an email",
      });
    }
    if (!new_password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a new password" });
    }

    let user = await Models.User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    user.password = md5(new_password);
    user.password_reset_code = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: 400, message: "Something went wrong", e });
    console.log("Exception: ", e);
  }
}

/* Saving and deleting session */
async function saveNewUserSession(sessionHash, userId, role) {
  try {
    let document = {
      session_hash: sessionHash,
      user_id: userId,
      user_role: role,
    };

    let newSession = Models.UserSession(document);
    let response = await newSession.save();
    if (!response || !response._id) {
      throw "Session not save insertedCount is " + response.insertedCount;
    }
  } catch (e) {
    console.log("Exception: ", e);
  }
}

// const resendOTP = async (req, res) => {};

const deleteUserSession = async (sessionHash) => {
  await Models.UserSession.findOneAndDelete({ session_hash: sessionHash });
};

const logOutUser = async (req, res) => {
  if (req.session_hash) {
    await deleteUserSession(req.session_hash);
    res.status(200).json({ success: true, message: "logged out successfully" });
  } else {
    res.status(400).json({
      success: false,
      message: "Failed to logout, Authentication header not present",
    });
  }
};
module.exports = {
  userLogin,
  userRegistration,
  forgotPassword,
  resetPassword,
  // resendOTP,
  logOutUser,
};
