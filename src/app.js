import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());


// User Routers Imported Here
import userRouter from "./route/user.route.js"

app.use("/api/v1/users", userRouter); // user logging in, signup routes are here



// Public API Routes Imported Here
import publicAPIData from "./route/publicAPI.route.js"

app.use("/api/v1/publicAPI", publicAPIData); // user logging in, signup routes are here


export default app;
