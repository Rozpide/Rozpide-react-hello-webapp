import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
    actions.agregarContacto(contact).then(() => {navigate("/"); 
  }).catch((error) => {
    console.error("ERROR AL AGREGAR CONTACTO!", error);
  });
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Add a new contact</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Full Name"
            value={contact.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter email"
            value={contact.email}
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
            value={contact.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            name="address"
            placeholder="Enter address"
            value={contact.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit"  className="btn btn-primary w-100" style={{ width: '1295px' }} >Save</button>
      </form>
      <div className="mt-3 text-center">
        <Link to="/">
          <span className="text-primary">or get back to contacts</span>
        </Link>
      </div>
    </div>
     );
    };
    {/*<div className="container mt-5">
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
        
      </form>
      <div className="mt-3">
        <button type="submit" className="btn btn-primary">Save</button>
      </div>

      <div className="mt-3">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Or get back to contacts</span>
        </Link>
      </div>
      
    </div>*/}
    
 
