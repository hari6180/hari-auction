import React, { useState } from "react";

const EditAuctionForm = ({ auction, onUpdate, onClose }) => {
  const [text, setText] = useState(auction.text);

  const onSubmit = async (event) => {
    event.preventDefault();
    onUpdate(auction.id, text);
    onClose();
  };

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <form className="edit-auction-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Edit your auction"
        value={text}
        required
        autoFocus
        onChange={onChange}
        className="form-input auction-input"
      />
      <div className="edit-auction-form-action">
        <button type="submit" className="form-btn-update">
          Update
        </button>
        <button type="button" className="form-btn-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditAuctionForm;
