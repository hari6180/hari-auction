import React from "react";
import { useParams } from "react-router-dom";
import Auctions from "../components/Auctions";

const MyAuctions = ({ auctionService }) => {
  const { username } = useParams();
  return <Auctions auctionService={auctionService} username={username} addable={false} />;
};

export default MyAuctions;
