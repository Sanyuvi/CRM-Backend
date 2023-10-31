import { ObjectId } from "mongodb";
import { client } from "../db.js";
import jwt from "jsonwebtoken";

export function getAllUsers(req) {
  return client.db("CRM").collection("Users").find(req.query).toArray();
}
export function addUsers(data) {
  return client.db("CRM").collection("Users").insertOne(data);
}
export function editUsersbyId(id, data) {
  return client
    .db("CRM")
    .collection("Users")
    .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data });
}
export function deleteUsersbyId(id) {
  return client
    .db("CRM")
    .collection("Users")
    .findOneAndDelete({ _id: new ObjectId(id) });
}
export function newAddedUser(userInfo) {
  return client.db("CRM").collection("Users").insertOne(userInfo);
}
export function getUser(email) {
  console.log(email);
  return client.db("CRM").collection("Users").findOne({ email: email });
}
export function generateToken(id) {
  return jwt.sign({ id }, process.env.SECRET_KEY);
}

export async function getUserRole(id) {
  try {
    const user = await client
      .db("CRM")
      .collection("Users")
      .findOne({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User not found");
    }

    return user.role;
  } catch (error) {
    console.error("Error in getUserRole:", error);
    return null;
  }
}
