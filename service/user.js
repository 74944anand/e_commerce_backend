const db = require("../models");
const pagination = require("../utils/pagination");
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;
const { QueryTypes, where } = require("sequelize");
const bcrypt = require("bcrypt");
const { USER_ROLE } = require("../utils/enum");
const result = require("underscore/cjs/result.js");

exports.getData = async (query) => {
  const { search, offset, pageSize } = pagination.paginationWithFromTo(
    query.search,
    query.page,
    query.limit
);  
const queryObj = {};
  if (search) {
    queryObj[Op.or] = [
      {firstName: { [Op.iLike]: "%" + search + "%" }},
      {lastName: { [Op.iLike]: "%" + search + "%" }},
      {username: { [Op.iLike]: "%" + search + "%" }},
      {email: { [Op.iLike]: "%" + search + "%" }}
    ];
}
let result;
let count;
if(query.candidates){
  result = await db.user.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email','createdAt'],
    where: queryObj,
    offset: offset,
    limit: pageSize,
    include: [
      {
        model: db.userRole,
        as: 'userRole',
        attributes:[],
        where: {
          roleId: { [Op.eq]: USER_ROLE.CANDIDATE }
        }
      }
    ],
    order: [['createdAt', 'DESC']] 
  });
  count = await db.user.count({
    where: queryObj,
    offset: offset,
    limit: pageSize,
    include: [
      {
        model: db.userRole,
        as: "userRole",
        where: {
          roleId: { [Op.eq]: USER_ROLE.CANDIDATE }
        }
      },
    ],
     order: [['updatedAt', 'DESC']]
  });
}
else if(query.recruters){
  result = await db.user.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email','createdAt'],
    where: queryObj,
    offset: offset,
    limit: pageSize,
    include: [
      {
        model: db.userRole,
        as: 'userRole',
        attributes:[],
        where: {
          roleId: { [Op.eq]: USER_ROLE.RECRUTER }
        }
      }
    ],
    order: [['createdAt', 'DESC']] 
  });
  count = await db.user.count({
    where: queryObj,
    offset: offset,
    limit: pageSize,
    include: [
      {
        model: db.userRole,
        as: "userRole",
        where: {
          roleId: { [Op.eq]: USER_ROLE.RECRUTER }
        }
      },
    ],
     order: [['updatedAt', 'DESC']]
  });
}
else{
  result = await db.user.findAll({
    where: queryObj,
    offset: offset,
    limit: pageSize,
    include: [
      {
        model: db.userRole,
        as: "userRole",
        attributes: ["roleId"],
        where: {
          roleId: { [Op.ne]: USER_ROLE.ADMIN }
        }
      },
    ],
    order: [['updatedAt', 'DESC']]
  });
  count = await db.user.count({where: queryObj});
}

  if (result && result.length) {
    return { success: true, message: "User Found", data: result ,count };
  } else {
    return { success: false, message: "User Not Found" };
  }
};

exports.getDataById = async (id, options) => {
  const result = await db.user.findOne({
    ...options,
    where: { id },
    include: [
      {
        model: db.role,
        as: "roles",
      },
    ],
  });
  if (result) {
    return { success: true, message: "User Found", data: result };
  } else {
    return { success: false, message: "User Not Found", data: result };
  }
};

exports.addData = async ({
  firstName,
  lastName,
  mobileNumber,
  password,
  email,
  roleId,
}) => {
  const roleData = await db.role.findOne({ where: { id: roleId } });
  if (!roleData) {
    return { success: false, message: "Role Not Found" };
  }
  if (mobileNumber) {
    const uniqueMobile = await db.user.findOne({ where: { mobileNumber } });
    if (uniqueMobile) {
      return { success: false, message: "Mobile number already present" };
    }
  }
  const existingUser = await db.user.findOne({
    where: { email },
    paranoid: false 
  });

  if (existingUser) {
    if (existingUser.deletedAt) {
      await db.user.update({ deletedAt: null }, { where: { email } });
      await db.userRole.update({ deletedAt: null }, { where: { userId: existingUser.id } });
    } else {
      return { success: false, message: "Email must be unique" };
    }
  }
  const result = await db.user.create({
    firstName,
    lastName,
    mobileNumber,
    password,
    email,
  });
  await db.userRole.create({ userId: result.id,roleId });
  if (result) {
    return { success: true, message: "User Added", data: result };
  } else {
    return { success: false, message: "Failed to Add User" };
  }
};


exports.updateDataById = async (
  id,
  { firstName, lastName, password, mobileNumber, email, roleId }
) => {
  // Check if the role exists if a roleId is provided
  if (roleId) {
    const roleData = await db.role.findOne({ where: { id: roleId } });
    if (!roleData) {
      return { success: false, message: "Role Not Found", data: roleData };
    }
  }

  // Find the user to update
  const user = await db.user.findOne({ where: { id } });
  if (!user) {
    return { success: false, message: "User Not Found", data: user };
  }

  // Build the update object with only provided fields
  const updateObj = {};
  if (firstName !== undefined) updateObj.firstName = firstName;
  if (lastName !== undefined) updateObj.lastName = lastName;
  if (password !== undefined) updateObj.password = password;
  if (mobileNumber !== undefined) updateObj.mobileNumber = mobileNumber;
  if (email !== undefined) updateObj.email = email;

  // Update user details
  const result = await user.update(updateObj);

  // Update userRole if a roleId is provided
  let roleUpdateResult = true;
  if (roleId) {
    roleUpdateResult = await db.userRole.update(
      { roleId },
      { where: { userId: id } }
    );
  }

  // Check if the update was successful
  if (result && roleUpdateResult) {
    return { success: true, message: "User Updated", data: result };
  } else {
    return { success: false, message: "Data Not Updated" };
  }
};


exports.deleteDataById = async (id,userId) => {
  const {roleId} = await db.userRole.findOne({where:{userId}});
  const userRole = await db.userRole.findOne({where:{userId:id}});

  if(!roleId==USER_ROLE.ADMIN){
    return { success: false, message: "You dont have permission for this !!!" };
  }
  if(userRole.roleId==USER_ROLE.ADMIN){
    return { success: false, message: "You dont have permission for this !!!" };
  }
  const result = await db.user.destroy({ where: { id } });
  if (result) {
    await db.userToken.destroy({where: {userId:id}})
    await db.userRole.destroy({where: {userId:id }})
    return { success: true, message: "User Deleted", result };
  } else {
    return { success: false, message: "User Not found" };
  }
};

exports.getAllAppliedUsers = async (userId, query) => {
  const { search, offset, pageSize } = pagination.paginationWithFromTo(
    query.search,
    query.page,
    query.limit
  );

  const jobIdsResult = await db.job.findAll({
    where: { userId },
    attributes: ['id'],
    raw: true,
  });

  const jobIds = jobIdsResult.map(job => job.id);

  const userJobResults = await db.userJobs.findAll({
    where: {
      jobId: {
        [Op.in]: jobIds,
      },
    },
    attributes: ['userId'],
    group: ['userId'], 
    raw: true,
  });

  const userJobUserIds = userJobResults.map(userJob => userJob.userId);

  const count = await db.user.count({
    where: {
      id: {
        [Op.in]: userJobUserIds,
      },
    },
  });

  const result = await db.user.findAll({
    where: {
      id: {
        [Op.in]: userJobUserIds,
      },
    },
    attributes: ['id', 'firstName', 'lastName', 'email'],
    offset,
    limit: pageSize,
  });


  if (result && result.length) {
    return { 
      success: true, 
      message: "Applicants Found", 
      data: result,
      count
    };
  } else {
    return { 
      success: false, 
      message: "Applicants Not Found",
    };
  }
}

exports.getAplicantsForJob = async (jobId,userId, query) => {
  const { search, offset, pageSize } = pagination.paginationWithFromTo(
    query.search,
    query.page,
    query.limit
  );

  const isJobBelongsTouser = await db.job.findOne({where:{id:jobId,userId}});
  if(!isJobBelongsTouser) {
    return { success: false, message: "Job does not belong to recruter" };
    }
  const result = await db.user.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'mobileNumber'],
    include: [{
      model: db.userJobs,
      as: 'userJobs',
      attributes: ['createdAt'], 
      required: true, 
      where: { jobId },
      order: [['createdAt', 'desc']]
    }],
    offset,
    limit: pageSize,
  });

  if (result && result.length) {
    return { 
      success: true, 
      message: "Applicants Found", 
      data: result,
    };
  } else {
    return { 
      success: false, 
      message: "Applicants Not Found",
    };
  }
}


