import { Router } from "express";
import { getWalletBalance } from "../controller/mainnetWallet.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/mainnetAPI/getWalletBalance:
 *   post:
 *     summary: Get Ethereum Wallet Balance
 *     tags:
 *        - Get Wallet Balance
 *     description: Get Wallet Balance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               walletInfuraLink:
 *                 type: string
 *               walletAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully fetched your wallet balance.
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               data:
 *                  statusCode: 200,
 *                  balanceInWei: 0 Wei,
 *                  balanceInETH": 0. ETH
 *               message: Successfully fetched your wallet balance.
 *       400:
 *         description: Invalid wallet URL or address
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 400
 *               message: Invalid wallet URL or address
 *       500:
 *         description: Something Went Wrong
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 500
 *               message: Something Went Wrong
 */
router.route("/getWalletBalance").post(getWalletBalance);


export default router;