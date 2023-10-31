import express from "express";
import bcrypt from "bcrypt";
import { getUser, newAddedUser } from "../Controllers/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    //generate salt value
    const salt = await bcrypt.genSalt(10);
    const signUpUser = await getUser(await req.body.email);
    if (!signUpUser) {
      //hash req.body password
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const hashedUser = await { ...req.body, password: hashedPassword };
      // add new user
      const result = await newAddedUser(hashedUser);
      console.log(result);
      if (!result.acknowledged) {
        return res
          .status(400)
          .send({ message: "Error uploading please try again" });
      }
      return res.status(201).send({ result, data: hashedUser });
    }
    // if user is already exist
    res.status(400).send({ message: "Given Email already exist " });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export const signUpRouter = router;
