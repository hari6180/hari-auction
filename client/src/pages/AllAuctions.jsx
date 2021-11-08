import React from "react";
import Auctions from "../components/Auctions";

const AllAuctions = ({ username, auctionService }) => (
  <Auctions username={username} auctionService={auctionService} addable={true} />
);

export default AllAuctions;
