const validator = require("validator");

const validateSignupData = (req) => {
  if (!req.firstName || !req.lastName) {
    throw new Error("Name is not valid");
  }
  if (!req.emailId || !validator.isEmail(req.emailId)) {
    throw new Error("Email is not valid");
  }
  if (!req.password || !validator.isStrongPassword(req.password)) {
    throw new Error("Please enter a strong password");
  }
};

const validateLoginData = (req) => {
  if (!req.emailId || !validator.isEmail(req.emailId)) {
    throw new Error("Email is not valid");
  }
};

module.exports = {
  validateSignupData,
  validateLoginData,
};
