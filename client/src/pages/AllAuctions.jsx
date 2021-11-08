import React from "react";
import Auctions from "../components/Auctions";

const AllAuctions = ({ auctionService }) => (
  <Auctions auctionService={auctionService} addable={true} />
);

export default AllAuctions;
