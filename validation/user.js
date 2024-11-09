const { body, param } = require("express-validator");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;


exports.updateUser = [
  param("id")
    .notEmpty()
    .withMessage("id is required parameter")
    .matches(/^\d+$/)
    .withMessage("Invalid integer format in parameter"),
    body("email")
    .notEmpty()
    .withMessage("email is required")
    .isLength({ min: 10, max: 50 })
    .withMessage("email must be minimum 10 chars and maximum 50 chars")
    .matches(emailRegex)
    .withMessage("Invalid email format")
    .trim(),
];

exports.createUser = [
  body("firstName")
    .notEmpty()
    .withMessage("firstName is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("firstName must be minimum 3 chars and maximum 50 chars")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage(
      "firstName must contain alphabets and spaces and not symbol and special characters."
    )
    .trim(),
  body("lastName")
    .notEmpty()
    .withMessage("lastName is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("lastName must be minimum 2 chars and maximum 50 chars")
    .matches(/^[a-zA-Z ]+$/)
    .withMessage(
      "lastName must contain alphabets and spaces and not symbol and special characters."
    )
    .trim(),
  body("mobileNumber")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("mobileNumber must be minimum 10 chars and maximum 10 number")
    .matches(/^\d+$/)
    .withMessage("Invalid integer format in mobileNumber")
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isLength({ min: 10, max: 50 })
    .withMessage("email must be minimum 10 chars and maximum 50 chars")
    .matches(emailRegex)
    .withMessage("Invalid email format")
    .trim(),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .matches(passwordRegex)
    .withMessage("Password must be at least 8 characters long, include at least one capital letter, one numeric character, and one special character.")
    .trim(),
];

exports.validateId = [
  param("id")
    .notEmpty()
    .withMessage("id is required parameter")
    .matches(/^\d+$/)
    .withMessage("Invalid integer format in parameter"),
];
