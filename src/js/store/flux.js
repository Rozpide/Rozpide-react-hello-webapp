import { redirect } from "react-router";

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                
                    {
                        id: 1,
                        nombre: "Juan Pérez",
                        telefono: "123456789",
                        correo: "juan.perez@example.com",
                        direccion: "Calle Falsa 123"
                    },
                    {
                        id: 2,
                        nombre: "María López",
                        telefono: "987654321",
                        correo: "maria.lopez@example.com",
                        direccion: "Avenida Siempre Viva 742"
                    },
                    {
                        id: 3,
                        nombre: "Carlos García",
                        telefono: "456123789",
                        correo: "carlos.garcia@example.com",
                        direccion: "Boulevard de los Sueños Rotos 123"
                    },
                    {
                        id: 4,
                        nombre: "Ana Martínez",
                        telefono: "789456123",
                        correo: "ana.martinez@example.com",
                        direccion: "los caños 10"
                    }
            ],
            contacts:[]
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            deleteContact: (contactID) => {
                const requestOption = {
                    method: 'DELETE',
                    redirect: 'follow'
                };
                fetch(`https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${contactID}`, requestOption)
                    .then((response) => response.contact())
                    .then((result) => {
                        console.log(result)
                        fetch("https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts") 
                        .then((response) => response.json())
                        .then((data) => {
                            setStore({ contacts: data.contacts });
                        })
                       
                    },
                    (error) => {
                        console.error('Error:', error);
                    });
                setStore({ contacts: 'Texto cambiado en flux' });
            },
            loadSomeData: () => {
                fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts')
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Error al obtener datos: ' + response.statusText);
                        }
                    })
                    .then(data => {
                        setStore({ contacts: data.contacts });
                    })
                    .catch(error => {
                        console.error('Error al obtener datos:', error);
                    });
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            agregarContacto: (contact) => {
                console.log('Enviando datos de contacto:', contact); // Agregar log para verificar datos
                fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contact),
                })
                .then(response => {
                    console.log('Respuesta de la API:', response); // Agregar log para verificar respuesta
                    if (response.ok) {
                        getActions().obtenerContactos();
                    } else {
                        throw new Error('Error al agregar contacto: ' + response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error al agregar contacto:', error);
                });
            },
            obtenerContactos: () => {
                fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts')
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Error al obtener contactos: ' + response.statusText);
                        }
                    })
                    .then(data => {
                        setStore({ contacts: data });
                    })
                    .catch(error => {
                        console.error('Error al obtener contactos:', error);
                    });
            },
            actualizarContacto: (id, contactoActualizado) => {
                fetch(`https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(contactoActualizado),
                })
                .then(response => {
                    if (response.ok) {
                        getActions().obtenerContactos();
                    } else {
                        throw new Error('Error al actualizar contacto: ' + response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error al actualizar contacto:', error);
                });
            },
            
        }
    };
};

export default getState;
