import express from "express";
import {
  addRequest,
  deleteRequestbyId,
  editRequestbyId,
  getAllrequest,
} from "../Controllers/servicerequest.js";
import { isAuthorized } from "../Authorization/authorize.js";

const router = express.Router();

router.get(
  "/all",
  isAuthorized(["Admin", "Manager", "Employee"]),
  async (req, res) => {
    try {
      const request = await getAllrequest(req);
      if (request.length <= 0) {
        return res.status(404).send({ message: "No Data Available" });
      }
      res.status(200).send(request);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);
router.post("/add", isAuthorized(["Admin", "Manager"]), async (req, res) => {
  try {
    if (Object.keys(req.body).length <= 0) {
      return res.status(400).send({ message: "No content available" });
    }
    const newRequest = await addRequest(req.body);
    if (!newRequest.acknowledged) {
      return res.status(400).send({ message: "Cannot add data" });
    }
    res.status(201).send({ result: newRequest, data: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
});
router.put(
  "/edit/:id",
  isAuthorized(["Admin", "Manager"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || Object.keys(req.body).length <= 0) {
        return res.status(400).send({ message: "Not a valid request" });
      }
      const editedResult = await editRequestbyId(id, req.body);
      res.status(200).send({ result: editedResult, data: req.body });
    } catch (error) {
      console.log(error);
      res.status(500).send({ Message: "Internal Server error" });
    }
  }
);
router.delete(
  "/delete/:id",
  isAuthorized(["Admin", "Manager"]),
  async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({ message: "Not a valid request" });
      }
      const deletedResult = await deleteRequestbyId(id);
      res
        .status(200)
        .send({ result: deletedResult, success: "Deleted Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

export const requestRouter = router;
