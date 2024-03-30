import { Router } from "express";
import { getAllCategories, getAllData } from "../controller/publicAPI.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/getAllCategories").get(getAllCategories); // Get All Categories
router.route("/getAllData").get(getAllData); // OPEN ROUTE
router.route("/getAllDataSecured").get(verifyJWT, getAllData); // SECURED ROUTE

export default router;