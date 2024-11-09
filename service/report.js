const db = require("../models");
const ExcelJS = require("exceljs");
const path = require("path");
const { Op } = require("sequelize");
const { USER_ROLE } = require("../utils/enum");

exports.getReport = async (query) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet1");

    let result;
    if (query.candidates) {
        result = await db.user.findAll({
            attributes: ['firstName', 'lastName', 'email', 'mobileNumber', 'createdAt'],
            include: [
                {
                    model: db.userRole,
                    as: 'userRole',
                    attributes: [],
                    where: {
                        roleId: { [Op.eq]: USER_ROLE.CANDIDATE } // Candidates
                    },
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    } else if (query.recruters) {
        result = await db.user.findAll({
            attributes: ['firstName', 'lastName', 'email', 'mobileNumber', 'createdAt'],
            include: [
                {
                    model: db.userRole,
                    as: 'userRole',
                    attributes: [],
                    where: {
                        roleId: { [Op.eq]: USER_ROLE.RECRUTER } // Recruiters
                    }
                }
            ],
            order: [['createdAt', 'DESC']]
        });
    } else {
        result = await db.userJobs.findAll({
            include: [
                {
                    model: db.user,
                    as: 'user',
                    attributes: ['firstName', 'lastName', 'email', 'mobileNumber'],
                    required: true,
                },
                {
                    model: db.job,
                    as: 'job',
                    attributes: ['id', 'title', 'description'],
                    required: true
                }
            ]
        });
        worksheet.columns = [
            { header: 'First Name', key: 'firstName', width: 20 },
            { header: 'Last Name', key: 'lastName', width: 20 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Mobile Number', key: 'mobileNumber', width: 20 },
            { header: 'Job Title', key: 'jobTitle', width: 30 },
            { header: 'Job Description', key: 'jobDescription', width: 30 }
        ];

        result.forEach(item => {
            worksheet.addRow({
                firstName: item.user.firstName,
                lastName: item.user.lastName,
                email: item.user.email,
                mobileNumber:item.user.mobileNumber,
                jobTitle: item.job.title,
                jobDescription: item.job.description
            });
        });
    }

    if (result && result.length) {
        if (query.candidates || query.recruiters) {
            // Set headers for candidates and recruiters
            worksheet.columns = [
                { header: 'First Name', key: 'firstName', width: 20 },
                { header: 'Last Name', key: 'lastName', width: 20 },
                { header: 'Email', key: 'email', width: 30 },
                { header: 'Mobile Number', key: 'mobileNumber', width: 20 },
                { header: 'Created At', key: 'createdAt', width: 25 }
            ];

            result.forEach(user => {
                worksheet.addRow({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    createdAt: user.createdAt
                });
            });
        }

        // Define the base URL and file paths
        let base_url = process.env.BASE_URL ? process.env.BASE_URL : "http://localhost:3000";
        const outputFile = `${Date.now()}-report.xlsx`;
        const resultPath = path.join("public/upload/candidateReport", outputFile);
        const finalPath = `${base_url}/upload/candidateReport/${outputFile}`;

        // Save the Excel file
        await workbook.xlsx.writeFile(resultPath);

        return {
            success: true,
            message: `Report Created`,
            data: finalPath
        };
    } else {
        return {
            success: false,
            message: `Report Not Created`
        };
    }
};
