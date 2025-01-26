const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            // Your data structures, A.K.A Entities
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
            contactos: []  // Añadimos contactos aquí
        },
        actions: {
            // Use getActions to call a function within a fuction
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            loadSomeData: () => {
                fetch().then().then(data => setStore({ "foo": data.bar }));
            },
            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({ demo: demo });
            },
            // Nueva acción para agregar contacto (POST)
            agregarContacto: async (contacto) => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(contacto),
                    });
                    if (response.ok) {
                        getActions().obtenerContactos(); // Recargar la lista de contactos después de agregar
                    }
                } catch (error) {
                    console.error("Error al agregar contacto:", error);
                }
            },
            // Nueva acción para obtener contactos (GET)
            obtenerContactos: async () => {
                try {
                    const response = await fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts');
                    const data = await response.json();
                    setStore({ contactos: data });
                } catch (error) {
                    console.error("Error al obtener contactos:", error);
                }
            },
            // Nueva acción para actualizar contacto (PUT)
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
                        getActions().obtenerContactos(); // Recargar la lista de contactos después de actualizar
                    }
                } catch (error) {
                    console.error("Error al actualizar contacto:", error);
                }
            },
            // Nueva acción para eliminar contacto (DELETE)
            eliminarContacto: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${id}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        getActions().obtenerContactos(); // Recargar la lista de contactos después de eliminar
                    }
                } catch (error) {
                    console.error("Error al eliminar contacto:", error);
                }
            }
        }
    };
};

export default getState;
