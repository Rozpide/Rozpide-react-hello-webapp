import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.agregarContacto(contact);
    setContact({ name: "", phone: "", email: "", address: "" }); // Resetear el formulario
  };

  return (
    <>
      <div className="text-center mt-5">
        <h1>Hello Rigo!</h1>
        <p>
          <img src={rigoImage} />
        </p>
        <a href="#" className="btn btn-success">
          If you see this green button, bootstrap is working
        </a>
        <p>
          <button onClick={actions.changeText}>Cambiar texto</button>
        </p>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={contact.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={contact.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={contact.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={contact.address}
              onChange={handleChange}
            />
            <button type="submit">Agregar Contacto</button>
          </form>
        </div>
      </div>
    </>
  );
};
