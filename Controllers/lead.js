import { client } from "../db.js";
import { ObjectId } from "mongodb";

export function getAllLeads(req) {
  return client.db("CRM").collection("Lead").find(req.query).toArray();
}
export function addLeads(data) {
  return client.db("CRM").collection("Lead").insertOne(data);
}
export function editLeadsbyId(id, data) {
  return client
    .db("CRM")
    .collection("Lead")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
}
export function deleteLeadsbyId(id) {
  return client
    .db("CRM")
    .collection("Lead")
    .findOneAndDelete({ _id: new ObjectId(id) });
}
