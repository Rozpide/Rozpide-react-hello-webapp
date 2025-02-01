import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
  const { store } = useContext(Context);
  const params = useParams();
  const contact = store.contacts.find(contact => contact.id === parseInt(params.theid));

  return (
    <div className="jumbotron">
      <h1 className="display-4">Detalles del Contacto</h1>
      {contact ? (
        <>
          <p><strong>Nombre:</strong> {contact.name}</p>
          <p><strong>Teléfono:</strong> {contact.phone}</p>
          <p><strong>Correo Electrónico:</strong> {contact.email}</p>
          <p><strong>Dirección:</strong> {contact.address}</p>
        </>
      ) : (
        <p>Contacto no encontrado.</p>
      )}

      <hr className="my-4" />

      <Link to="/">
        <span className="btn btn-primary btn-lg" role="button">Back home</span>
      </Link>
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object
};

