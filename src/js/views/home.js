import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard";
import ConfirmationModal from "../component/ConfirmationModal";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, ''); // Remueve cualquier carácter no numérico

  if (cleaned.length <= 3) {
    return `(${cleaned})`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3)}`;
  } else {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
  }
};

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    actions.obtenerContactos()
      .then(() => {
        console.log('Contactos obtenidos correctamente:', store.contacts);
      })
      .catch(err => {
        console.error('Error al obtener contactos:', err);
      });
  }, []);

  const handleEditClick = (contact) => {
    setSelectedContact(contact);
  };

  const handleDeleteClick = (contactId) => {
    setContactToDelete(contactId);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    actions.deleteContact(contactToDelete)
      .then(() => {
        console.log('Contacto eliminado correctamente:', contactToDelete);
        setShowModal(false);
        setContactToDelete(null);
      })
      .catch(err => {
        console.error('Error al eliminar contacto:', err);
      });
  };

  const handleSave = (updatedContact) => {
    return actions.actualizarContacto(updatedContact.id, updatedContact)
      .then(() => {
        console.log('Contacto actualizado correctamente:', updatedContact);
        setSelectedContact(null); // Limpiar selección después de guardar
        return actions.obtenerContactos(); // Obtener contactos actualizados
      });
  };

  if (!Array.isArray(store.contacts)) {
    console.error('store.contacts no es un array:', store.contacts);
    return <p>Error: La lista de contactos no es un array.</p>;
  }

  return (
    <div className="text-center mt-5">
      <h1>Hello Rigo!</h1>
      {selectedContact ? (
        <ContactCard contact={selectedContact} onSave={handleSave} onDelete={handleDeleteClick} />
      ) : (
        <>
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
              <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-user me-2"></i> {capitalizeWords(item.name)}
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-map-marker-alt mr-2 me-2"></i> {capitalizeWords(item.address)}
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-phone mr-2 me-2"></i> {formatPhoneNumber(item.phone)}
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fas fa-envelope mr-2 me-2"></i> {capitalizeWords(item.email)}
                  </div>
                </div>
                <div className="ml-auto d-flex p-2">
                  <button onClick={() => handleEditClick(item)} className="btn btn-sm btn-primary me-2">
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => handleDeleteClick(item.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <ConfirmationModal
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
};

export default Home;
