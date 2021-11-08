import * as auctionRepository from "../data/auction.js";
import { getSocketIO } from "../connection/socket.js";

export async function getAuctions(req, res) {
  const username = req.query.username;
  const data = await (username
    ? auctionRepository.getAllByUsername(username)
    : auctionRepository.getAll());
  res.status(200).json(data);
}

export async function getAuction(req, res) {
  const id = req.params.id;
  const auction = await auctionRepository.getById(id);
  if (auction) {
    res.status(200).json(auction);
  } else {
    res.status(404).json({ message: `Auction id(${id}) not found` });
  }
}

export async function createAuction(req, res) {
  const { title, description, startPrice, duration, itemImage } = req.body;
  const auction = await auctionRepository.create(
    title,
    description,
    startPrice,
    duration,
    itemImage,
    req.userId
  );
  res.status(201).json(auction);
  getSocketIO().emit("auctions", auction);
}

export async function updateAuction(req, res) {
  const id = req.params.id;
  const { title, description, startPrice, duration, itemImage } = req.body;
  const auction = await auctionRepository.getById(id);
  if (!auction) {
    return res.status(404).json({ message: `Auction not found: ${id}` });
  }
  // if (auction.userId !== req.userId) {
  //   return res.sendStatus(403);
  // }
  const updated = await auctionRepository.update(
    id,
    title,
    description,
    startPrice,
    duration,
    itemImage
  );
  res.status(200).json(updated);
}

export async function deleteAuction(req, res, next) {
  const id = req.params.id;
  const auction = await auctionRepository.getById(id);
  if (!auction) {
    return res.status(404).json({ message: `Auction not found: ${id}` });
  }
  // if (auction.userId !== req.userId) {
  //   return res.sendStatus(403);
  // }
  await auctionRepository.remove(id);
  res.sendStatus(204);
}
