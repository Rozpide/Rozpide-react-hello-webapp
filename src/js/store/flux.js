const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "THIRD",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "FOURTH",
                    background: "white",
                    initial: "white"
                }
            ],
            contactos: []
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            loadSomeData: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts');
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contactos: data });
                    } else {
                        console.error('Error al obtener datos:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error al obtener datos:', error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            agregarContacto: async (contacto) => {
                try {
                    console.log('Enviando datos de contacto:', contacto); // Agregar log para verificar datos
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(contacto),
                    });
                    console.log('Respuesta de la API:', response); // Agregar log para verificar respuesta
                    if (response.ok) {
                        getActions().obtenerContactos();
                    } else {
                        console.error('Error al agregar contacto:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error al agregar contacto:', error);
                }
            },
            obtenerContactos: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts');
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ contactos: data });
                    } else {
                        console.error('Error al obtener contactos:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error al obtener contactos:', error);
                }
            },
            actualizarContacto: async (id, contactoActualizado) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(contactoActualizado),
                    });
                    if (response.ok) {
                        getActions().obtenerContactos();
                    } else {
                        console.error('Error al actualizar contacto:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error al actualizar contacto:', error);
                }
            },
            eliminarContacto: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${id}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        getActions().obtenerContactos();
                    } else {
                        console.error('Error al eliminar contacto:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error al eliminar contacto:', error);
                }
            }
        }
    };
};

export default getState;
