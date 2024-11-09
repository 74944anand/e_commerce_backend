/**
@swagger
 * /candidate-jobs:
 *   post:
 *     tags:
 *       - userJobs
 *     summary: Apply for Job
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - jobId
 *           properties:
 *             jobId:
 *               type: integer
 *               description: jobId
 *               example: 1
 *     responses:
 *       201:
 *         description: Applied for job
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: success
 *       422:
 *         description: Failed to apply for job
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: failed to apply for job
 */

/**
 * @swagger
 * /candidate-jobs:
 *   get:
 *     tags:
 *       - candidate
 *     summary: Retrieve jobs for all candidates
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved job data for all candidates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 candidates:
 *                   type: array
 *                   description: List of candidates with their job applications
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Candidate ID
 *                         example: 1
 *                       firstName:
 *                         type: string
 *                         description: Candidate's first name
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         description: Candidate's last name
 *                         example: "Doe"
 *                       email:
 *                         type: string
 *                         description: Candidate's email address
 *                         example: "john.doe@example.com"
 *                       jobs:
 *                         type: array
 *                         description: List of jobs the candidate has applied for
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                               description: Job ID
 *                               example: 1
 *                             title:
 *                               type: string
 *                               description: Job title
 *                               example: "Software Engineer"
 *                             company:
 *                               type: string
 *                               description: Company offering the job
 *                               example: "TechCorp"
 *                             applicationDate:
 *                               type: string
 *                               format: date
 *                               description: Date when the candidate applied
 *                               example: "2024-08-01"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       description: Total number of candidates
 *                       example: 100
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages
 *                       example: 10
 *                     currentPage:
 *                       type: integer
 *                       description: Current page number
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       description: Number of items per page
 *                       example: 10
 *       404:
 *         description: No candidates or jobs found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No candidates or jobs found
 */

/**
 * @swagger
 * /candidate-jobs/{id}:
 *   get:
 *     tags:
 *       - candidate
 *     summary: Retrieve jobs applied by a specific candidate
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the candidate for whom jobs are being retrieved
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved job data for the candidate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 candidate:
 *                   type: object
 *                   description: Candidate with their job applications
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Candidate ID
 *                       example: 1
 *                     firstName:
 *                       type: string
 *                       description: Candidate's first name
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       description: Candidate's last name
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       description: Candidate's email address
 *                       example: "john.doe@example.com"
 *                     jobs:
 *                       type: array
 *                       description: List of jobs the candidate has applied for
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: Job ID
 *                             example: 1
 *                           title:
 *                             type: string
 *                             description: Job title
 *                             example: "Software Engineer"
 *                           company:
 *                             type: string
 *                             description: Company offering the job
 *                             example: "TechCorp"
 *                           applicationDate:
 *                             type: string
 *                             format: date
 *                             description: Date when the candidate applied
 *                             example: "2024-08-01"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                       description: Total number of job applications for the candidate
 *                       example: 5
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages
 *                       example: 1
 *                     currentPage:
 *                       type: integer
 *                       description: Current page number
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       description: Number of items per page
 *                       example: 10
 *       404:
 *         description: No jobs found for the candidate
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No jobs found for this candidate
 */


/**
 * @swagger
 * /candidate-jobs/applicants/jobs:
 *   get:
 *     tags:
 *       - candidate-jobs
 *     summary: Get jobs applied by candidates
 *     description: Retrieve a list of jobs that candidates have applied to, including job and user details.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: search
 *         in: query
 *         description: Search keyword to filter the results.
 *         required: false
 *         type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination.
 *         required: false
 *         type: integer
 *         default: 1
 *       - name: limit
 *         in: query
 *         description: Number of results per page.
 *         required: false
 *         type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: List of jobs applied by candidates with details.
 *         schema:
 *           type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               description: Status code of the response.
 *               example: 200
 *             result:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The ID of the job application record.
 *                     example: 5
 *                   userId:
 *                     type: integer
 *                     description: The ID of the user who applied for the job.
 *                     example: 4
 *                   jobId:
 *                     type: integer
 *                     description: The ID of the job that was applied for.
 *                     example: 4
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the application was created.
 *                     example: "2024-08-08T18:50:34.985Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the application was last updated.
 *                     example: "2024-08-08T18:50:34.985Z"
 *                   deletedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the application was deleted, if applicable.
 *                     example: null
 *                   job:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         description: The title of the job.
 *                         example: "Job4"
 *                       description:
 *                         type: string
 *                         description: A description of the job.
 *                         example: "Job4"
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of the user.
 *                         example: 4
 *                       firstName:
 *                         type: string
 *                         description: The first name of the user.
 *                         example: "Soham"
 *                       lastName:
 *                         type: string
 *                         description: The last name of the user.
 *                         example: "Shaha"
 *                       email:
 *                         type: string
 *                         description: The email address of the user.
 *                         example: "soham@gmail.com"
 *             count:
 *               type: integer
 *               description: Total number of job applications matching the criteria.
 *               example: 1
 *       404:
 *         description: No job applications found or invalid request.
 *         schema:
 *           type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               description: Status code of the response.
 *               example: 404
 *             message:
 *               type: string
 *               description: A message explaining the error or no results found.
 *               example: "No job applications found"
 *       500:
 *         description: Internal server error.
 *         schema:
 *           type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               description: Status code of the response.
 *               example: 500
 *             message:
 *               type: string
 *               description: A message indicating the server error.
 *               example: "An error occurred while processing your request."
      bearerFormat: JWT
 */
