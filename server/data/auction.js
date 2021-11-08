import MongoDb from "mongodb";
import { getAuctions } from "../database/database.js";
import * as userRepository from "./auth.js";
const ObjectId = MongoDb.ObjectId;

export async function getAll() {
  return getAuctions() //
    .find()
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapAuctions);
}

export async function getAllByUsername(username) {
  return getAuctions() //
    .find({ username })
    .sort({ createdAt: -1 })
    .toArray()
    .then(mapAuctions);
}

export async function getById(id) {
  return getAuctions()
    .findOne({ _id: new ObjectId(id) })
    .then(mapOptionalTweet);
}

export async function create(title, description, startPrice, duration, itemImage, userId) {
  const { name, username } = await userRepository.findById(userId);
  const auction = {
    title,
    description,
    startPrice,
    duration,
    itemImage,
    name: name,
    username: username,
  };
  return getAuctions()
    .insertOne(auction)
    .then((data) => mapOptionalTweet({ ...auction, _id: data.insertedId }));
}

export async function update(id, auction) {
  const { title, description, startPrice, duration, itemImage } = auction;
  return getAuctions()
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { title, description, startPrice, duration, itemImage } },
      { returnDocument: "after" }
    )
    .then((result) => result.value)
    .then(mapOptionalTweet);
}

export async function remove(id) {
  return getAuctions().deleteOne({ _id: new ObjectId(id) });
}

function mapOptionalTweet(auction) {
  return auction ? { ...auction, id: auction._id.toString() } : auction;
}

function mapAuctions(auctions) {
  return auctions.map(mapOptionalTweet);
}
