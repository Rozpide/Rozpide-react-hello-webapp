import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const AddContact = () => {
  const { actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Llamar a la API para obtener los datos del contacto
      fetch(
        `https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${id}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error al cargar contacto: " + response.statusText);
          }
        })
        .then((data) => {
          setContact({
            name: data.full_name,
            email: data.email,
            phone: data.phone,
            address: data.address,
          });
        })
        .catch((error) => {
          console.error("Error al cargar el contacto:", error);
          alert("Hubo un problema al cargar los datos del contacto.");
          navigate("/");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      // Actualizar contacto existente
      actions
        .actualizarContacto(id, contact)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error("Error al actualizar contacto:", err);
        });
    } else {
      // Agregar nuevo contacto
      actions
        .agregarContacto(contact)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          console.error("Error al agregar contacto:", err);
        });
    }
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();
    actions.agregarContacto(contact).then(() => {navigate("/"); 
  }).catch((error) => {
    console.error("ERROR AL AGREGAR CONTACTO!", error);
  });
  }*/

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
      <div className="mt-3 text-left">
        <Link to="/">
          <span className="text-primary ms-0">or get back to contacts</span>
        </Link>
      </div>
    </div>
  );
};
