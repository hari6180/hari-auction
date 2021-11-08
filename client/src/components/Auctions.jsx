import React, { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Banner from "./Banner";
import NewAuctionForm from "./NewAuctionForm";
import AuctionCard from "./AuctionCard";
import { useAuth } from "../context/AuthContext";
import CardDetail from "./CardDetail";

const Auctions = memo(({ auctionService, username, addable }) => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState("");

  const selectItem = (card) => {
    setSelectedItem(card);
  };

  useEffect(() => {
    auctionService
      .getAuctions(username)
      .then((auctions) => setAuctions([...auctions]))
      .catch(onError);

    const stopSync = auctionService.onSync((auction) => onCreated(auction));
    return () => stopSync();
  }, [auctionService, username, user]);

  const onCreated = (auction) => {
    setAuctions((auctions) => [auction, ...auctions]);
  };

  const onDelete = (auctionId) =>
    auctionService
      .deleteAuction(auctionId)
      .then(() => setAuctions((auctions) => auctions.filter((auction) => auction.id !== auctionId)))
      .catch((error) => setError(error.toString()));

  const onUpdate = (auctionId, auction) =>
    auctionService
      .updateAuction(auctionId, auction)
      .then((updated) =>
        setAuctions((auctions) => auctions.map((item) => (item.id === updated.id ? updated : item)))
      )
      .catch((error) => error.toString());

  const onError = (error) => {
    setError(error.toString());
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <div className="py-5">
      <div className="container">
        {addable && (
          <NewAuctionForm username={username} auctionService={auctionService} onError={onError} />
        )}
        {error && <Banner text={error} isAlert={true} transient={true} />}
        {auctions.length === 0 && <p className="auctions-empty">No Auctions Yet</p>}
        {selectedItem && (
          <div>
            <CardDetail card={selectedItem} onUpdate={onUpdate} />
          </div>
        )}
        {auctions && (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {auctions.map((auction) => {
              return (
                <AuctionCard
                  key={auction.id}
                  auction={auction}
                  owner={auction.username === user.username}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  selectItem={selectItem}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});
export default Auctions;
