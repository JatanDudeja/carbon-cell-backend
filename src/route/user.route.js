import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controller/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").get((req, res) => {
  res.status(200).send("Working Bro No Tension Taking");
});

router.route("/register").post(registerUser); // REGISTER NEW USER
router.route("/login").post(loginUser); // LOGIN A USER
router.route("/logout").post(verifyJWT, logoutUser); // LOGOUT A USER

export default router;