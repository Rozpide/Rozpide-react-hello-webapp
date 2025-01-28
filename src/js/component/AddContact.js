import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const AddContact = () => {
  const { actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.agregarContacto(contact);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1>Add New Contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={contact.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={contact.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={contact.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={contact.address}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Save Contact</button>
      </form>
    </div>
  );
};
