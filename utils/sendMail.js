const nodemailer = require("nodemailer")
const db = require("../models");
require("dotenv").config();

exports.sendEmail = async (subject, text, email,cc) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    let mailData = {
      from: "JOB PORTAL SERVICE",   
      to: email,
       cc: cc,
      subject: subject,
      html: text,
    }
      transporter.sendMail(mailData).then(response => {
      console.log(JSON.stringify(mailData),JSON.stringify(response),"success")
    })
    .catch(error => {
        console.log(JSON.stringify(mailData),JSON.stringify(error),"error")
    });
};


exports.sendEmailForResetPassword = async (subject, text, email, cc = null) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailData = {
      from: `"JOB PORTAL SERVICE" <${process.env.EMAIL}>`,
      to: email,
      cc: cc,
      subject: subject,
      html: text,
    };

    const info = await transporter.sendMail(mailData);
    console.log("Email sent successfully:", info.messageId);
    return { success: true, info };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
