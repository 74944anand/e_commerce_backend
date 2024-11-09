const { body, param } = require('express-validator');

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

//login
exports.loginValidation = [
    body('email').notEmpty().withMessage('Email must be specified.').isLength({min: 9, max: 50}).withMessage().trim()
    .matches(emailRegex).withMessage("Email must be a valid email address."),

    body("password").notEmpty().withMessage("password is required")
    .matches(passwordRegex)
    .withMessage("pPassword must be at least 8 characters long, include at least one capital letter, one numeric character, and one special character.").trim()
        ]
