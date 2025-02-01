import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ContactCard = ({ contact, onSave, onDelete }) => {
  const [editableContact, setEditableContact] = useState(contact);
  const navigate = useNavigate();

  useEffect(() => {
    setEditableContact(contact);
  }, [contact]);

  const handleChange = (e) => {
    setEditableContact({
      ...editableContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editableContact).then(() => navigate("/"));
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Full Name"
            value={editableContact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group ">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={editableContact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            placeholder="Enter phone"
            value={editableContact.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group ">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Enter address"
            value={editableContact.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-3">
          Save
        </button>
      </form>
      <div className="text-left">
        <Link to="/">
          <span className="text-primary">or get back to contacts hay que joderse</span>
        </Link>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  contact: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ContactCard;
