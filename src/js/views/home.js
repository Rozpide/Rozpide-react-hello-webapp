
import React, { useState, useContext, useEffect} from "react";
import { Link } from "react-router-dom";
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

  
 /*useEffect(() => {
    actions.obtenerContactos();
  }, []);
 */

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
              <p>{item.phone}</p>
              <p>{item.email}</p>
              <p>{item.address}</p>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => actions.deleteContact(item.id)}
            >
              Borrar contacto
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
