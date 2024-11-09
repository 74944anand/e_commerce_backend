const db = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { forgetPasswordTemplate } = require("../utils/mailTemplates");
const { sendEmailForResetPassword } = require("../utils/sendMail");
const moment=require("moment");
require("dotenv").config();
const {redisClient,isRedisConnected} = require('../config/redisConfig');

exports.userLogin = async (email, password) => {
  const user = await db.user.findOne({ where: { email } });

  if (!user) {
    return { success: false, message: 'Invalid email or password.' };
  }

  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    return { success: false, message: 'Invalid email or password.' };
  }

  const userRoles = await db.userRole.findAll({
    where: { userId: user.id },
    attributes: ['roleId'],
    include: [
      {
        model: db.role,
        as: 'role',
        attributes: ['roleName'],
      },
    ],
  });

  const roleIds = userRoles.map((role) => role.roleId);

  if (roleIds.length === 0) {
    return { success: false, message: 'No roles assigned to user.' };
  }

  // const permissions = await db.rolePermission.findAll({
  //   where: { roleId: roleIds },
  //   attributes: ['id', 'roleId', 'permissionId'],
  //   include: [
  //     {
  //       model: db.permission,
  //       as: 'permission',
  //       attributes: ['id'],
  //     },
  //   ],
  // });

  // if (permissions.length === 0) {
  //   return { success: false, message: 'No permissions found for roles.' };
  // }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );
  let redisToken;
  
  if(isRedisConnected){
    redisToken = await redisClient.get(`user:${user.id}:token`);
    if (redisToken) {
      await redisClient.set(`user:${user.id}:token`, token, 'EX', 3600 ); 
    } else {
      await redisClient.set(`user:${user.id}:token`, token, 'EX', 3600 );
    }
  }
  
  const existingToken = await db.userToken.findOne({
    where: { userId: user.id },
  });

  if (existingToken) {
    // Update existing token
    await db.userToken.update({ token }, { where: { userId: user.id } });
  } else {
    // Create a new token entry
    await db.userToken.create({ userId: user.id, token });
  }

  return {
    success: true,
    id: user.id,
    token,
    userRole: userRoles,
    message: 'Logged in successfully.',
  };
};

exports.userLogout = async (userId, token) => {
   
  if (token) {
    if(isRedisConnected){
      await redisClient.del(`user:${userId}:token`);
    }
      const deleteToken = await db.userToken.destroy({ where: {  user_id: userId ,  token }});
      if (deleteToken) {
          return ({ success:true, message: 'User Logged Out' })
      }
      else {
          return ({ success:false, message: 'User Not Logged Out' })
      }
  }
  else {
      return ({ success:false, message: 'User Not Logged Out' })
  }
}

exports.forgotPasswordService = async (forgotPasswordData) => {
  try {
    const { email } = forgotPasswordData;
    const user = await db.user.findOne({ where: { email: email } });

    if (!user) {
      return { error: true, data: null, message: "Email not found!" };
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const emailTemplate = forgetPasswordTemplate({
      firstName: user.firstName,
      otp,
    });

    let expiryTime = moment().add(10, "minutes");
    await db.userOtp.create({
      userId: user.id,
      otp,
      expiryTime,
      otpFor: "resetPassword",
    });

    const emailSent = await sendEmailForResetPassword(emailTemplate.subject, emailTemplate.message, user.email);

    if (!emailSent) {
      return { error: true, message: "Failed to send email. Please try again later." };
    }

    return { error: null, message: "Email sent successfully" };
  } catch (err) {
    console.error("Error in forgotPasswordService:", err);
    return { error: true, message: "Error while processing your request" };
  }
};


exports.verifyOtpService = async (verifyOtpData) => {
  const { email, otp } = verifyOtpData;
  const user = await db.user.findOne({ where: { email: email } });
  if (!user) {
    return { error: true, data: user, message: "Email not found!" };
  }
  const userOtp = await db.userOtp.findOne({
    where: { userId: user.id, otp, expiryTime: { [Op.gte]: moment() } },
    order: [["createdAt", "DESC"]],
  });
  if (!userOtp) {
    return { error: true, message: "OTP is invalid or expired!" };
  } else if (userOtp.isVerified) {
    return { error: true, message: "otp already verified!" };
  }
  const result = await db.userOtp.update(
    { isVerified: true },
    {
      where: {
        id: userOtp.id,
      },
    }
  );
  if (result[0]) {
    return { error: null, message: "Otp verified successfully", data: result };
  } else {
    return { error: true, message: "error while verifying OTP!" };
  }
};

exports.resetPasswordService = async (resetPasswordData) => {
  const { id, password } = resetPasswordData;
  const user = await db.user.findOne({ where: { id: id } });
  if (!user) {
    return { error: true, data: user, message: "User not found!" };
  }
  const result = await db.user.update(
    { password },
    {
      where: {
        id: user.id,
      },
      individualHooks: true
    }
  );
  if (result[0]) {
    return { error: null, message: "Password updated", data: result };
  } else {
    return {
      error: true,
      data: result,
      message: "error while updating password",
    };
  }
};
