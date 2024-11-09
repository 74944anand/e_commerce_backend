/**
 * @swagger
 * /jobs:
 *   get:
 *     tags:
 *       - job
 *     name: Read all jobs
 *     summary: To read all jobs
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         type: integer
 *         example: 1
 *       - name: limit
 *         in: query
 *         description: Number of jobs per page
 *         required: false
 *         type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Data found
 *         schema:
 *           type: object
 *           description: job data
 *           properties:
 *             allJobsData:
 *               title: data
 *               description: job data
 *               type: array
 *       404:
 *         description: Data not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: Data not found
 */

/**
 * @swagger
 * /jobs:
 *   post:
 *     tags:
 *       - job
 *     summary: Add a new job
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
 *             - title
 *             - description
 *           properties:
 *             title:
 *               type: string
 *               description: Title of the job
 *               example: "Software Engineer"
 *             description:
 *               type: string
 *               description: Description of the job
 *               example: "Responsible for developing and maintaining software applications."
 *     responses:
 *       201:
 *         description: Job successfully created
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: Job created successfully
 *             job:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Job ID
 *                   example: 1
 *                 title:
 *                   type: string
 *                   description: Title of the job
 *                   example: "Software Engineer"
 *                 description:
 *                   type: string
 *                   description: Description of the job
 *                   example: "Responsible for developing and maintaining software applications."
 *       400:
 *         description: Invalid input
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: Invalid input
 */

/**
 * @swagger
 * /jobs/{id}:
 *   delete:
 *     tags:
 *       - job
 *     summary: Delete a job
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the job to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Job successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Job successfully deleted
 *       404:
 *         description: Job not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Job not found
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized access
 */

