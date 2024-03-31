import { Router } from "express";
import { getAllCategories, getAllData } from "../controller/publicAPI.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/v1/publicAPI/getAllCategories:
 *   get:
 *     summary: Get All Categories
 *     tags:
 *       - Public API
 *     description: Retrieve a list of all categories from the public API
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Animals", "Books", "Data Validation"]
 *       500:
 *         description: Failed to fetch categories from the external API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: string
 *                   example: Failed to fetch data from external API
 */
router.route("/getAllCategories").get(getAllCategories);

/**
 * @swagger
 * /api/v1/publicAPI/getAllData:
 *   get:
 *     summary: Get All Data
 *     tags:
 *       - Public API
 *     description: Retrieve a list of all data entries from the public API
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Optional category to filter data entries
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Optional limit for the number of data entries to retrieve
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Failed to fetch data from the external API
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: string
 *                   example: Failed to fetch data from external API
 */
router.route("/getAllData").get(getAllData);

/**
 * @swagger
 * /api/v1/publicAPI/getAllDataSecured:
 *   get:
 *     summary: Get All Data (Secured)
 *     tags:
 *       - Public API
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Optional category to filter data entries
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Optional limit for the number of data entries to retrieve
 *     description: Retrieve a list of all data entries from the public API (secured route)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 */
router.route("/getAllDataSecured").get(verifyJWT, getAllData);

export default router;
