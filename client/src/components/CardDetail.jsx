import React from "react";
import { Form } from "react-bootstrap";
import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed, props }) => {
  return (
    <div className="col">
      <div className="card shadow-sm my-3 flex-row">
        <div
          style={{
            width: "60%",
            height: "300px",
            margin: "auto",
            backgroundImage: `url(${props.card.itemImage})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div
          className="card-body"
          style={{
            width: "40%",
          }}
        >
          <p className="lead display-6">{props.card.title}</p>
          <p className="card-text">{props.card.description}</p>
          <div className="d-flex justify-content-around align-card-center">
            <div>
              <h5>Last bid made</h5>
              <h6>${props.card.startPrice}</h6>
            </div>
            <div>
              <h5>Available Until</h5>
              <h6>
                {hours}:{minutes}:{seconds}
              </h6>
            </div>
          </div>
          <div className=" align-card-center">
            <div>
              {!props.owner ? (
                <button
                  onClick={() => {
                    props.bidAuction();
                  }}
                  className="btn btn-outline-secondary w-100"
                >
                  Place a Bid
                </button>
              ) : props.owner.email === props.card.email ? (
                <button
                  onClick={() => props.endAuction(props.card.id)}
                  className="btn btn-outline-secondary w-100"
                >
                  Cancel Auction
                </button>
              ) : (
                <button
                  onClick={() => props.bidAuction(props.card.id, props.card.curPrice)}
                  className="btn btn-outline-secondary w-100"
                >
                  Place a Bid
                </button>
              )}
            </div>
            <Form>
              <Form.Check type="checkbox" id="default-checkbox" label="Activate the auto-bidding" />
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardDetail = ({ card }) => {
  const { duration } = card;

  return (
    <Countdown
      // owner={owner}
      date={duration}
      // bidAuction={bidAuction}
      // endAuction={onDelete}
      // updateAuction={onUpdate}
      card={card}
      renderer={renderer}
      // selectItem={selectItem}
    />
  );
};

export default CardDetail;
