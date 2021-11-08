import React, { useRef, useState } from "react";
import { Form, Modal, Button, Alert, Row, Col } from "react-bootstrap";

const NewAuctionForm = ({ auctionService, onError }) => {
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

  // const imgTypes = ["image/png", "image/jpeg", "image/jpg"];

  const onChange = (event) => {
    // if (!imgTypes.includes(itemImage.current.files[0].type)) {
    //   return setError("Please use a vaild image");
    // }

    let currentDate = new Date();
    let dueDate = currentDate.setHours(currentDate.getHours() + itemDuration.current.value);

    let newAuction = {
      // email: currentUser.email,
      title: itemTitle.current.value,
      desc: itemDesc.current.value,
      curPrice: startPrice.current.value,
      duration: dueDate,
      itemImage: itemImage.current.files[0],
    };

    setAuction(newAuction);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");
    closeForm();

    auctionService
      .postAuction(auction)
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
                  <Form.Control type="text" required ref={itemTitle} onChange={onChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Description</Form.Label>
                  <Form.Control type="text" required ref={itemDesc} onChange={onChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Start Price</Form.Label>
                  <Form.Control type="number" required ref={startPrice} onChange={onChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Duration in hours</Form.Label>
                  <Form.Control type="number" required ref={itemDuration} onChange={onChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Seller</Form.Label>
                  {/* <Form.Control type="text" value={currentUser.email} readOnly  /> */}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Item Image</Form.Label>
                  <Form.File
                    label="Select Item Image"
                    custom
                    required
                    ref={itemImage}
                    onChange={onChange}
                  />
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
