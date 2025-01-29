
import React, { useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import ConfirmationModal from "../component/ConfirmationModal";
import 'bootstrap/dist/css/bootstrap.min.css';

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};
const formatPhoneNumber = (phone) => {
  // Remueve cualquier carácter no numérico del teléfono
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3)}`;
  } else {
    return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
  }
};



export const Home = () => {
  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null)
  

  useEffect(() => {
    actions.obtenerContactos()
      .then(() => {
        console.log('Contactos obtenidos correctamente.');
      })
      .catch(err => {
        console.error('Error al obtener contactos:', err);
      });
  }, []);
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



  if (!Array.isArray(store.contacts)) {
    return <p>Error: La lista de contactos no es un array.</p>;
  }

  return (
    <div className="text-center mt-5">
      <h1>Contact List</h1>
      
      {/*<p>
        <Link to="/add-contact" className="btn btn-success">
          Add New Contact
        </Link>
      </p>*/}
      
      <ul className="list-group mt-5">
        {store.contacts.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            <div>
              <h4 className="d-flex align-items-center mb-3">{capitalizeWords(item.name)}</h4>
              <div className="d-flex align-items-center mb-3"><i className="fas fa-user me-3"></i>  {capitalizeWords(item.name)}</div>
              <div className="d-flex align-items-center mb-3"><i className="fas fa-map-marker-alt me-3"></i> {capitalizeWords(item.address)}</div>
              <div className="d-flex align-items-center mb-3"><i className="fas fa-phone me-3"></i> {formatPhoneNumber(item.phone)}</div>
              <div className="d-flex align-items-center mb-3"><i className="fas fa-envelope me-3"></i> {capitalizeWords(item.email)}</div>
              
            </div>
            <div className="ml-auto d-flex p-2">
              <Link to="/add-contact" className="btn  btn-sm  boton-editar">
                <i className="fas fa-pencil-alt"></i>
              </Link>
              <button
                className="btn  btn-sm boton-eliminar ms-2 delete-button"
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
        handleConfirm={handleConfirmDelete}/> 

    </div>
  );
};
