/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login User
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
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               description: email
 *               example: "email@gmail.com"
 *             password:
 *               type: string
 *               description: password
 *               example: "email@123"
 *     responses:
 *       200:
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: success
 *             token:
 *               type: string
 *               description: Authentication token
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: Invalid email or password
 */


/**
 * @swagger
 * /auth/logout:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Logout User
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Logout successful
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: Logout successful
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               title: message
 *               type: string
 *               example: Unauthorized
 */


/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset the user's password
 *     description: This endpoint allows a user to reset their password using their user ID.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - id
 *             - password
 *           properties:
 *             id:
 *               type: integer
 *               description: The ID of the user whose password is to be reset.
 *               example: 1
 *             password:
 *               type: string
 *               description: The new password for the user.
 *               example: "AnandK@123"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the password reset was successful.
 *               example: true
 *             message:
 *               type: string
 *               description: A message indicating the result of the operation.
 *               example: "Password reset successfully"
 *       400:
 *         description: Invalid request or missing parameters
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the request was successful.
 *               example: false
 *             message:
 *               type: string
 *               description: A message explaining the error.
 *               example: "Invalid user ID or password"
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the request was successful.
 *               example: false
 *             message:
 *               type: string
 *               description: A message indicating the server error.
 *               example: "An error occurred while processing your request."
 */

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify OTP for password reset
 *     description: This endpoint verifies the OTP sent to the user's email during the password reset process.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - otp
 *           properties:
 *             email:
 *               type: string
 *               description: The email address of the user to verify the OTP for.
 *               example: "anandkole@nimapinfotech.com"
 *             otp:
 *               type: integer
 *               description: The OTP sent to the user's email for verification.
 *               example: 2870
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the OTP verification was successful.
 *               example: true
 *             message:
 *               type: string
 *               description: A message indicating the result of the verification.
 *               example: "OTP verified successfully"
 *       400:
 *         description: Invalid request or incorrect OTP
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the request was successful.
 *               example: false
 *             message:
 *               type: string
 *               description: A message explaining the error.
 *               example: "Invalid OTP or email"
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the request was successful.
 *               example: false
 *             message:
 *               type: string
 *               description: A message indicating the server error.
 *               example: "An error occurred while processing your request."
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Request a password reset
 *     description: This endpoint sends a password reset OTP to the user's email address.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *               description: The email address of the user who requested the password reset.
 *               example: "anandkole@nimapinfotech.com"
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the password reset email was sent successfully.
 *               example: true
 *             message:
 *               type: string
 *               description: A message indicating the result of the email send operation.
 *               example: "Password reset email sent successfully"
 *       400:
 *         description: Invalid request or email not found
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the request was successful.
 *               example: false
 *             message:
 *               type: string
 *               description: A message explaining the error.
 *               example: "Email not found"
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               description: Indicates if the request was successful.
 *               example: false
 *             message:
 *               type: string
 *               description: A message indicating the server error.
 *               example: "An error occurred while processing your request."
 */
