const Models = require("../../models/model");
const jwt = require("jsonwebtoken");
const config = require("../../../config/local");

async function authenticateUserSession(req, res, next) {
  let authToken = req.headers.authorization;
  let session_hash = null;
  if (!authToken) {
    return res.status(440).json({
      success: false,
      status_code: 440,
      message: "No authorization token with api request",
    });
  }

  try {
    let decodedToken = jwt.verify(authToken, config.jwtSecret_user);
    session_hash = decodedToken.session_hash;
    if (!session_hash) {
      return res.status(440).json({
        success: false,
        status_code: 440,
        message: "Could not authenticate, Invalid auth token",
      });
    }
    let response = await Models.UserSession.findOne({
      session_hash: session_hash,
    });
    if (response && response._id) {
      if (response.expire_at) {
        let currentTimestamp = new Date().getTime();
        if (new Date(response?.expire_at).getTime() < currentTimestamp) {
          return res.status(440).json({
            success: false,
            status_code: 440,
            message: "Your session has been expired",
          });
        }
      }
      // ============ GET USER INFO HERE ====================
      let user_doc = await Models.User.findOne({
        _id: response.user_id,
        status: config.status.verified,
      });
      if (!user_doc._id) {
        await Models.UserSession.findOneAndDelete({
          session_hash: session_hash,
        });
        return res.status(440).json({
          success: false,
          status_code: 440,
          message: "Could not authenticate, Invalid auth token",
        });
      }
      req.user = user_doc;
      req.role = response.user_role;
      req.session_id = response._id;
      req.session_hash = session_hash;

      next();
    } else {
      return res.status(440).json({
        success: false,
        status_code: 440,
        message: "Your session has been expired",
      });
    }
  } catch (e) {
    console.log("Exception: ", e);
    return res.status(440).json({
      success: false,
      status_code: 440,
      message: "Something went wrong while authenticating session",
    });
  }
}
module.exports = {
  authenticateUserSession,
};
