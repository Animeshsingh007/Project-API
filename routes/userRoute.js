const router = require('express').Router();
const controller = require('../controller/userController');

router.post('/signup',controller.signup)

/**
 * @swagger
 * /user/signup:
 *   post:
 *     tags:
 *       - USER SIGNUP
 *     description: API belongs to signup user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: first_name
 *         description: first name is required.
 *         in: formData
 *         required: true
 *       - name: last_name
 *         description: last name is required.
 *         in: formData
 *         required: true
 *       - name: email
 *         description: email is required.
 *         in: formData
 *         required: true
 *       - name: mobile
 *         description: mobile number is required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password is required.
 *         in: formData
 *         required: true
 *       - name: confirmPassword
 *         description: confirm password is required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: You have signup.
 *       404:
 *         description: Input field error.
 *       500:
 *         description: Internal server error.
 *       409:
 *         description: Email already exists.
 *       501:
 *         description: Unable to send OTP / something went wrong - Try Again.
 */


router.post('/login',controller.login)

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - LOGIN 
 *     description: Creating Docs for user login with JWT token
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email is required.
 *         in: formData
 *         required: true
 *       - name: password
 *         description: password is required.
 *         in: formData
 *         required: true
 *     responses:
 *       200:
 *         description: You have successfully logged in.
 *       500:
 *         description: Internal server error.
 */

router.get('/categories',controller.categories)

/**
 * @swagger
 * /user/categories:
 *   get:
 *     tags:
 *       - Categories 
 *     description: API to retrieve wikipedia categories
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description:Categories retrieved 
 *       500:
 *         description: Internal server error.
 */


module.exports = router;