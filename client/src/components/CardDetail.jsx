import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
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
              <button
                onClick={() => {
                  props.card.startPrice = Number(props.card.startPrice) + 1;
                  console.log(props.card);
                  props.onUpdate(props.card.id, props.card);
                }}
                className="btn btn-outline-secondary w-100"
              >
                Place a Bid
              </button>
            </div>
            <Form>
              <Form.Check
                className="my-3"
                onChange={props.onCheck}
                type="checkbox"
                id="default-checkbox"
                label="Activate the auto-bidding"
              />
              {props.checked && (
                <>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Maximum bid</Form.Label>
                        <Form.Control type="number" required />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Bid Alert notification</Form.Label>
                        <Form.Control type="number" required />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button className="btn w-100 my-3" variant="primary" type="submit">
                    Submit
                  </Button>
                </>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardDetail = ({ card, onUpdate }) => {
  const { duration } = card;
  const [checked, setChecked] = useState(false);
  const onCheck = () => {
    if (!checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  return (
    <Countdown
      date={duration}
      // bidAuction={bidAuction}
      card={card}
      onUpdate={onUpdate}
      renderer={renderer}
      onCheck={onCheck}
      checked={checked}
    />
  );
};

export default CardDetail;
