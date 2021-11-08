import express from "express";
import "express-async-errors";
import { body } from "express-validator";
import * as auctionController from "../controller/auction.js";
import { isAuth } from "../middleware/auth.js";
import { validate } from "../middleware/validator.js";

const router = express.Router();

const validateAuction = [
  body("title").trim().isLength({ min: 3 }).withMessage("title should be at least 3 characters"),
  validate,
];

// GET /auction
// GET /auctions?username=:username
router.get("/", isAuth, auctionController.getAuctions);

// GET /auctions/:id
router.get("/:id", isAuth, auctionController.getAuction);

// POST /auction
router.post(
  "/",
  isAuth,
  //  validateAuction,
  auctionController.createAuction
);

// PUT /auctions/:id
router.put(
  "/:id",
  isAuth,
  //  validateAuction,
  auctionController.updateAuction
);

// DELETE /auctions/:id
router.delete("/:id", isAuth, auctionController.deleteAuction);

export default router;
