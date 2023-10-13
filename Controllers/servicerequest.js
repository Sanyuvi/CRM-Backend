import { client } from "../db.js";
import { ObjectId } from "mongodb";

export function getAllrequest(req) {
  return client
    .db("CRM")
    .collection("Servicerequest")
    .find(req.query)
    .toArray();
}
export function addRequest(data) {
  return client.db("CRM").collection("Servicerequest").insertOne(data);
}
export function editRequestbyId(id, data) {
  return client
    .db("CRM")
    .collection("Servicerequest")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
}
export function deleteRequestbyId(id) {
  return client
    .db("CRM")
    .collection("Servicerequest")
    .findOneAndDelete({ _id: new ObjectId(id) });
}
