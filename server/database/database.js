import MongoDb from "mongodb";
import { config } from "../config.js";

let db;
export async function connectDB() {
  return MongoDb.MongoClient.connect(config.db.host) //
    .then((client) => {
      db = client.db();
    });
}

export function getUsers() {
  return db.collection("users");
}

export function getAuctions() {
  return db.collection("auctions");
}
