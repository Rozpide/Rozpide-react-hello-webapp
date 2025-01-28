import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
  const { store, actions } = useContext(Context);

  function deleteItem(indexToDelete){
    
  }

  return (
    <div className="container">
      <ul className="list-group">
        {store.contact.map((item, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}
            >
              <h5>{item.name}</h5>
              <p>{item.phone}</p>
              <p>{item.email}</p>
              <p>{item.address}</p>
              <button
                className="btn btn-danger"
                onClick={() => actions.deleteContact(index)}
              >
                Borrar contacto
              </button>
            </li>
          );
        })}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
