import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./Routes/User.js";
import { leadRouter } from "./Routes/lead.js";
import { requestRouter } from "./Routes/servicerequest.js";
import { isAuthenticated } from "./Authentication/auth.js";
import { signUpRouter } from "./Routes/signup.js";
import { loginRouter } from "./Routes/login.js";
//config dotenv
dotenv.config();

const PORT = process.env.PORT;

//initializing server
const app = express();

//middle wares
app.use(cors());
app.use(express.json());

//application routes
app.use("/", signUpRouter);
app.use("/", loginRouter);
app.use("/users", isAuthenticated, userRouter);
app.use("/leads", isAuthenticated, leadRouter);
app.use("/request", isAuthenticated, requestRouter);

// start listening server
app.listen(PORT, () => console.log(`Server started in localhost:${PORT}`));
