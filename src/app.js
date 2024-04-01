import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Carbon Cell Backend",
      version: "1.0.0",
      description: "Carbon Cell Backend Take Home Project",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://carbon-cell-backend-iy99.onrender.com",
      },
    ],
  },
  apis: ["src/route/*.route.js"],
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://carbon-cell-backend-iy99.onrender.com",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// User Routers Imported Here
import userRouter from "./route/user.route.js";

app.use("/api/v1/users", userRouter); // user logging in, signup routes are here

// Public API Routes Imported Here
import publicAPIData from "./route/publicAPI.route.js";

app.use("/api/v1/publicAPI", publicAPIData); // user logging in, signup routes are here

import mainnetAPI from './route/mainnetWalletBalance.route.js';

app.use("/api/v1/mainnetAPI", mainnetAPI); //  Mainnet Wallet Balances

export default app;
