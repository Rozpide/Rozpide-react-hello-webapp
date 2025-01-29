import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.obtenerContactos();
  }, []);

  return (
    <div className="container">
      <ul className="list-group">
        {store.contacts.map((item, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
            >
              <h5>{item.name}</h5>
              <p>{item.phone}</p>
              <p>{item.email}</p>
              <p>{item.address}</p>
              <button
                className="btn btn-danger"
                onClick={() => actions.deleteContact(item.id)}
              >
                Borrar contacto
              </button>
            </li>
          );
        })}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary boton-save mb-3">Back home</button>
      </Link>
    </div>
  );
};

