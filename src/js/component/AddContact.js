import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams, Link } from "react-router-dom";

export const AddContact = () => {
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Intentar encontrar el contacto en el store si existe
      const existingContact = store.contacts.find(contact => contact.id === parseInt(id));
      if (existingContact) {
        setContact(existingContact);
      } else {
        console.error("Contacto no encontrado");
        alert("El contacto no existe.");
        navigate("/");
      }
    }
  }, [id, store.contacts, navigate]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      actions.actualizarContacto(id, contact)
        .then(() => navigate("/"))
        .catch((err) => {
          console.error("Error al actualizar contacto", err);
          alert("Hubo un problema al actualizar el contacto.");
        });
    } else {
      actions.agregarContacto(contact)
        .then(() => navigate("/"))
        .catch((err) => {
          console.error("Error al agregar contacto", err);
          alert("Hubo un problema al agregar el contacto.");
        });
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">{id ? "Edit Contact" : "Add a new contact"}</h1>
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
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
            placeholder="Enter email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-3">
          {id ? "Update Contact" : "Save"}
        </button>
      </form>
      <div className="text-left">
        <Link to="/">
          <span className="text-primary">or get back to contacts</span>
        </Link>
      </div>
    </div>
  );
};

export default AddContact;
