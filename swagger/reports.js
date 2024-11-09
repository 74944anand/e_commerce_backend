/**
 * @swagger
 * /reports:
 *   get:
 *     tags:
 *       - reports
 *     summary: Retrieve all candidates in Excel format
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: Successfully retrieved candidates data in Excel format
 *         content:
 *           application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: No candidates found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No candidates found
 */
