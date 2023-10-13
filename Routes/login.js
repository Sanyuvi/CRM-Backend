import express from "express";
import bcrypt from "bcrypt";
import { generateToken, getUser } from "../Controllers/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    //collecting the req.body and find
    const loginUser = await getUser(req.body.email);
    if (!loginUser) {
      return res.status(400).send({ message: "Invalid Email Address" });
    }
    //check password is correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    if (!validPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const token = generateToken(loginUser._id);
    res.status(200).send({ data: loginUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export const loginRouter = router;
