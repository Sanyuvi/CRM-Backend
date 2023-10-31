import express from "express";
import {
  addUsers,
  deleteUsersbyId,
  editUsersbyId,
  getAllUsers,
} from "../Controllers/User.js";
import { isAuthorized } from "../Authorization/authorize.js";

const router = express.Router();

router.get("/all", isAuthorized(["Admin"]), async (req, res) => {
  try {
    const users = await getAllUsers(req);
    if (users.length <= 0) {
      return res.status(404).send({ message: "No Data Available" });
    }
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({ Message: "Internal Server error" });
  }
});
router.post("/add", isAuthorized(["Admin"]), async (req, res) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      return res.status(400).send({ message: "No Content available" });
    }
    const newUser = await addUsers(req.body);
    if (!newUser.acknowledged) {
      return res.status(400).send({ message: "Cannot add data" });
    }
    res.status(201).send({ result: newUser, data: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Message: "Internal Server error" });
  }
});
router.put("/edit/:id", isAuthorized(["Admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || Object.keys(req.body).length <= 0) {
      return res.status(400).send({ message: "Not a valid request" });
    }
    const editedResult = await editUsersbyId(id, req.body);
    res.status(200).send({ result: editedResult, data: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Message: "Internal Server error" });
  }
});
router.delete("/delete/:id", isAuthorized(["Admin"]), async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).send({ message: "Not a valid request" });
    }
    const deletedResult = await deleteUsersbyId(id);
    res
      .status(200)
      .send({ result: deletedResult, success: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ Message: "Internal Server error" });
  }
});

export const userRouter = router;
