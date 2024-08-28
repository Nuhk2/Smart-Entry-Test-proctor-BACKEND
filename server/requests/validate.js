const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = {};
  var errorMessage;
  errors.array().forEach((err) => {
    const fieldName = err.path || "field";
    if (!extractedErrors[fieldName]) {
      extractedErrors[fieldName] = err.msg;
      errorMessage = err.msg;
    }
  });
  return res.status(422).json({
    status: 422,
    message: errorMessage,
    errors: extractedErrors,
  });
};
module.exports = {
  validate,
};
