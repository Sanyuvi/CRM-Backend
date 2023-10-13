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

// export async function getUserRole(id) {
//   console.log(id);
//   try {
//     const user = await client
//       .db("CRM")
//       .collection("Users")
//       .findOne({ _id: new ObjectId(id) });

//     if (!user) {
//       throw new Error("User not found");
//     }
//     console.log(user);
//     return user.role;
//   } catch (error) {
//     console.error("Error in getUserRole:", error);
//     return null; // Return null if an error occurs
//   }
// }
// export async function getUserRole(id) {
//   const user = await client
//     .db("CRM")
//     .collection("Users")
//     .findOne({ _id: new ObjectId(id) });
//   return user ? user.role : null;
// }

// export async function getUserRole(id) {
//   try {
//     const user = await client
//       .db("CRM")
//       .collection("Users")
//       .findOne({ _id: new ObjectId(id) });

//     console.log("Retrieved user for role check:", user);

//     return user ? user.role : null;
//   } catch (error) {
//     console.error("Error while retrieving user:", error);
//     return null;
//   }
// }

// export function generateToken(id) {
//   console.log("Generating token for user ID:", id);
//   const token = jwt.sign({ id }, process.env.SECRET_KEY);
//   console.log("Generated token:", token);
//   return token;
// }

// export function getUser(email) {
//   console.log("Fetching user with email:", email);
//   const user = client.db("CRM").collection("Users").findOne({ email: email });
//   console.log("Retrieved user data:", user);
//   return user;
// }

// export async function getUser(email) {
//   try {
//     // console.log("Fetching user with email:", email);
//     const user = await client
//       .db("CRM")
//       .collection("Users")
//       .findOne({ email: email });
//     // console.log("Retrieved user data:", user);
//     return user;
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     throw error;
//   }
// }
