
import React, { useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  

  useEffect(() => {
    actions.obtenerContactos()
      .then(() => {
        console.log('Contactos obtenidos correctamente.');
      })
      .catch(err => {
        console.error('Error al obtener contactos:', err);
      });
  }, []);

  const handleDelete = (id) => {
    actions.deleteContact(id)
      .then(() => {
        console.log('Contacto eliminado correctamente:', id);
      })
      .catch(err => {
        console.error('Error al eliminar contacto:', err);
      });
  };

  if (!Array.isArray(store.contacts)) {
    return <p>Error: La lista de contactos no es un array.</p>;
  }

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!</h1>
      <p>
        <img src={rigoImage} alt="Rigo" />
      </p>
      <p>
        <Link to="/add-contact" className="btn btn-success">
          Add New Contact
        </Link>
      </p>
      
      <ul className="list-group mt-5">
        {store.contacts.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <div>
              <h5>{item.name}</h5>
              <p>{item.address}</p>
              <p>{item.phone}</p>
              <p>{item.email}</p>
              
            </div>
            <div className="ml-auto d-flex">
              <Link to="/add-contact" className="btn btn-primary btn-sm mr-2 boton-editar">
                <i className="fas fa-pencil-alt"></i>
              </Link>
              <button
                className="btn btn-danger btn-sm boton-eliminar"
                onClick={() => handleDelete(item.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
