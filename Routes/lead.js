import express from "express";
import {
  addLeads,
  deleteLeadsbyId,
  editLeadsbyId,
  getAllLeads,
} from "../Controllers/lead.js";
import { isAuthenticated } from "../Authentication/auth.js";
import { isAuthorized } from "../Authorization/authorize.js";

const router = express.Router();
router.get(
  "/all",
  isAuthorized(["Admin", "Manager", "Employee"]),
  async (req, res) => {
    try {
      const leads = await getAllLeads(req);
      if (leads.length <= 0) {
        return res.status(404).send({ message: "No Data Available" });
      }
      res.status(200).send(leads);
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
    const newLead = await addLeads(req.body);
    if (!newLead.acknowledged) {
      return res.status(400).send({ message: "Cannot add data" });
    }
    res.status(201).send({ result: newLead, data: req.body });
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
      const editedResult = await editLeadsbyId(id, req.body);
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
      const deletedResult = await deleteLeadsbyId(id);
      res
        .status(200)
        .send({ result: deletedResult, success: "Deleted Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal server error" });
    }
  }
);

export const leadRouter = router;
