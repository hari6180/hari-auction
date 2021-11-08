import React, { useRef, useState } from "react";
import { Form, Modal, Button, Alert, Row, Col } from "react-bootstrap";

const NewAuctionForm = ({ username, auctionService, onError }) => {
  const [auction, setAuction] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const itemTitle = useRef();
  const itemDesc = useRef();
  const startPrice = useRef();
  const itemDuration = useRef();
  const itemImage = useRef();

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    closeForm();

    let currentDate = new Date();
    let dueDate = currentDate.setHours(currentDate.getHours() + itemDuration.current.value);

    let newAuction = {
      title: itemTitle.current.value,
      description: itemDesc.current.value,
      startPrice: startPrice.current.value,
      duration: dueDate,
      itemImage: itemImage.current.value,
    };

    setAuction(newAuction);

    auctionService
      .postAuction(newAuction)
      .then((created) => {
        setAuction("");
      })
      .catch(onError);
  };

  return (
    <>
      <div className="col d-flex justify-content-center my-3">
        <button onClick={openForm} className="btn btn-outline-secondary mx-2">
          + Auction
        </button>
      </div>
      <Modal centered show={showForm} onHide={closeForm}>
        <form onSubmit={onSubmit}>
          <Modal.Header>
            <Modal.Title>Create Auction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Item Title</Form.Label>
                  <Form.Control type="text" required ref={itemTitle} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Description</Form.Label>
                  <Form.Control type="text" required ref={itemDesc} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Price</Form.Label>
                  <Form.Control type="number" required ref={startPrice} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Duration in hours</Form.Label>
                  <Form.Control type="number" required ref={itemDuration} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Seller</Form.Label>
                  <Form.Control type="text" value={username} readOnly />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Image URL</Form.Label>
                  <Form.Control type="text" required ref={itemImage} />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default NewAuctionForm;
