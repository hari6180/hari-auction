import React, { memo, useState } from "react";
import parseDate from "../util/date";
import EditAuctionForm from "./EditAuctionForm";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed, props, owner }) => {
  // if (completed) {
  //   return null;
  // }

  return (
    <div className="col">
      <div className="card shadow-sm">
        <div
          style={{
            height: "320px",
            backgroundImage: `url(${props.item.itemImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="w-100"
        />

        <div className="card-body">
          <p className="lead display-6">{props.item.title}</p>
          <div className="d-flex justify-content-between align-item-center">
            <h5>
              {hours}:{minutes}:{seconds}
            </h5>
          </div>
          <p className="card-text">{props.item.description}</p>
          <div className="d-flex justify-content-between align-item-center">
            <div>
              {!props.owner ? (
                <button
                  onClick={() => {
                    props.selectItem(props.item);
                  }}
                  className="btn btn-outline-secondary"
                >
                  Bid Now
                </button>
              ) : props.owner.email === props.item.email ? (
                <button
                  onClick={() => props.endAuction(props.item.id)}
                  className="btn btn-outline-secondary"
                >
                  Cancel Auction
                </button>
              ) : (
                <button
                  onClick={() => {
                    props.selectItem(props.item);
                  }}
                  className="btn btn-outline-secondary"
                >
                  Bid Now
                </button>
              )}
            </div>
            <p className="display-6">${props.item.startPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuctionCard = ({ auction, owner }) => {
  // let expireDate = item.duration;
  // const { currentUser, bidAuction, endAuction } = useContext(AuthContext);
  const { id, username, name, title, description, startPrice, duration, itemImage } = auction;
  const [editing, setEditing] = useState(false);
  const onClose = () => setEditing(false);

  return (
    <Countdown
      owner={owner}
      date={duration}
      // bidAuction={bidAuction}
      // endAuction={endAuction}
      item={auction}
      renderer={renderer}
      // selectItem={selectItem}
    />
  );
};

export default AuctionCard;
