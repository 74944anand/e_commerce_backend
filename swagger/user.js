/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - user
 *     name: Read all users
 *     summary: To read all users
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: recruters
 *         in: query
 *         description: Filter to retrieve recruiters
 *         required: false
 *         schema:
 *           type: boolean
 *           example: false
 *       - name: candidates
 *         in: query
 *         description: Filter to retrieve candidates
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Data found
 *         schema:
 *           type: object
 *           description: User data
 *           properties:
 *             alluserData:
 *               type: array
 *               description: User data
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: User ID
 *                     example: 1
 *                   firstName:
 *                     type: string
 *                     description: User's first name
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     description: User's last name
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     description: User's email address
 *                     example: "john.doe@example.com"
 *                   role:
 *                     type: string
 *                     description: User's role
 *                     example: "candidate"
 *             pagination:
 *               type: object
 *               properties:
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of users
 *                   example: 100
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                   example: 10
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page
 *                   example: 10
 *       404:
 *         description: Data not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Data not found
 */


/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - user
 *     summary: Add user
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
 *             - firstName
 *             - lastName
 *             - mobileNumber
 *             - email
 *             - password
 *             - roleId
 *           properties:
 *             firstName:
 *               type: string
 *               description: firstName
 *               example: 'Anand'
 *             lastName:
 *               type: string
 *               description: lastName
 *               example: 'Kole'
 *             mobileNumber:
 *               type: string
 *               description: mobileNumber
 *               example: '8898766543'
 *             email:
 *               type: string
 *               description: email
 *               example: 'anand@gmail.com'
 *             password:
 *               type: string
 *               description: password
 *               example: 'Anand@123'
 *             roleId:
 *               type: integer
 *               description: roleId
 *               example: 1
 *     responses:
 *       201:
 *         description: user added
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: success
 *       422:
 *         description: Failed to add user
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: failed to add user
 */
/**
 * @swagger
 * /user/{id}:
 *   put:
 *     tags:
 *       - user
 *     summary: Update user
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of user to update
 *         required: true
 *         type: string
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - mobileNumber
 *             - email
 *             - password
 *             - roleId
 *           properties:
 *             firstName:
 *               type: string
 *               description: firstName
 *               example: 'Anand'
 *             lastName:
 *               type: string
 *               description: lastName
 *               example: 'Kole'
 *             mobileNumber:
 *               type: string
 *               description: mobileNumber
 *               example: '8898766543'
 *             email:
 *               type: string
 *               description: email
 *               example: 'anand@gmail.com'
 *             password:
 *               type: string
 *               description: password
 *               example: 'Anand@123'
 *             roleId:
 *               type: integer
 *               description: roleId
 *               example: 1
 *     responses:
 *       201:
 *         description: user updated
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: success
 *       422:
 *         description: Failed to update user
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: failed to update user
 */
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     tags:
 *       - user
 *     summary: To get user by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of user to get
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: To get user by id
 *         schema:
 *           type: object
 *       404:
 *         description: user not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: not found
 */
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     tags:
 *       - user
 *     summary: Delete user by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Id of user to be deleted
 *         required: true
 *         type: string
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: User is deleted by id
 *         schema:
 *           type: object
 *       404:
 *         description: User not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: not found
 */


/**
 * @swagger
 * /user/applicants/all:
 *   get:
 *     tags:
 *       - applicants
 *     summary: Retrieve all applicants who have applied to the recruiter previously
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Successfully retrieved applicants data
 *         schema:
 *           type: object
 *           properties:
 *             applicants:
 *               type: array
 *               description: List of applicants who have applied to the recruiter
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Applicant ID
 *                     example: 1
 *                   firstName:
 *                     type: string
 *                     description: Applicant's first name
 *                     example: "John"
 *                   lastName:
 *                     type: string
 *                     description: Applicant's last name
 *                     example: "Doe"
 *                   email:
 *                     type: string
 *                     description: Applicant's email address
 *                     example: "john.doe@example.com"
 *                   appliedDate:
 *                     type: string
 *                     format: date
 *                     description: Date when the applicant applied
 *                     example: "2024-08-01"
 *       404:
 *         description: No applicants found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: No applicants found
 */


/**
 * @swagger
 * /user/applicants/{id}:
 *   get:
 *     tags:
 *       - applicants
 *     summary: Retrieve all applicants who have applied to the particular job of a recruiter
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job
 *         schema:
 *           type: integer
 *       - name: page
 *         in: query
 *         description: Page number for pagination
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved applicants data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 applicants:
 *                   type: array
 *                   description: List of applicants who have applied to the recruiter's job
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Applicant ID
 *                         example: 1
 *                       firstName:
 *                         type: string
 *                         description: Applicant's first name
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         description: Applicant's last name
 *                         example: "Doe"
 *                       email:
 *                         type: string
 *                         description: Applicant's email address
 *                         example: "john.doe@example.com"
 *                       appliedDate:
 *                         type: string
 *                         format: date
 *                         description: Date when the applicant applied
 *                         example: "2024-08-01"
 *       404:
 *         description: No applicants found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No applicants found
 */

/**
 * @swagger
 * /user/signup/candidate:
 *   post:
 *     tags:
 *       - user
 *     summary: Signup a new candidate
 *     description: Creates a new candidate user with the provided details.
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
 *             - firstName
 *             - lastName
 *             - mobileNumber
 *             - email
 *             - password
 *             - roleId
 *           properties:
 *             firstName:
 *               type: string
 *               description: The first name of the user.
 *               example: 'Anand'
 *             lastName:
 *               type: string
 *               description: The last name of the user.
 *               example: 'Kole'
 *             mobileNumber:
 *               type: string
 *               description: The mobile number of the user.
 *               example: '8898766543'
 *             email:
 *               type: string
 *               description: The email address of the user.
 *               example: 'anand@gmail.com'
 *             password:
 *               type: string
 *               description: The password for the user's account.
 *               example: 'Anand@123'
 *             roleId:
 *               type: integer
 *               description: The role ID assigned to the user.
 *               example: 1
 *     responses:
 *       201:
 *         description: User added successfully.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A message indicating the result of the operation.
 *               example: 'User added successfully'
 *       422:
 *         description: Failed to add user.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: A message explaining the failure.
 *               example: 'Failed to add user'
 */
