import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controller/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").get((req, res) => {
  res.status(200).send("Working Bro No Tension Taking");
});

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a User
 *     tags:
 *        - User Login, Register, Logout
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 201
 *               data:
 *                 _id: 12345
 *                 username: JohnDoe
 *                 __v: 0
 *               message: User registered successfully
 *       409:
 *         description: User already exists.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 409
 *               message: A user with the username John Doe already exists.
 *       500:
 *         description: User already exists.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: Internal Server Error
 */
router.route("/register",).post(registerUser);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login a User
 *     tags:
 *        - User Login, Register, Logout
 *     description: Login an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized - Invalid credentials
 */
router.route("/login").post(loginUser);

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Logout a User
 *     tags:
 *        - User Login, Register, Logout
 *     description: Logout an authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */
router.route("/logout").post(verifyJWT, logoutUser);

export default router;
