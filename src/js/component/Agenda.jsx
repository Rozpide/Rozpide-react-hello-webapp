import React from "react";

const Agenda = () => {
    const [agenda, setAgenda] = useState([]);
    const [nuevoContacto, setNuevoContacto] = useState({});

    const obtenerContactos = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                if(!response.ok) {
                    throw new Error ('Error al obtener contacto');}
                    return response.json();
            })
            .then(data => setAgenda(data.contacts));
    
    };

    
  return (
    <div>
      <h1>Agenda</h1>
    </div>
  );
}