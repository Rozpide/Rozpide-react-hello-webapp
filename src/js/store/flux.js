const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [], // Estado inicial bien definido
    },
    actions: {
      obtenerContactos: () => {
        return fetch("https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error al obtener contactos: " + response.statusText);
            }
          })
          .then((data) => {
            console.log("Datos recibidos de la API:", data);
            // Asegurarse de que data.contacts es un array antes de actualizar el store
            if (data && Array.isArray(data.contacts)) {
              setStore({ contacts: data.contacts });
              console.log("Contactos actualizados:", data.contacts);
            } else {
              console.error("La respuesta no contiene contactos en el formato esperado:", data);
              setStore({ contacts: [] }); // Asegurarse de que siempre es un array
            }
          })
          .catch((error) => {
            console.error("Error al obtener contactos:", error);
            setStore({ contacts: [] }); // En caso de error, asegurarse de que siempre es un array
            throw error; // Propagar el error para que pueda ser capturado en `useEffect`
          });
      },

      agregarContacto: (contacto) => {
        console.log("Enviando datos de contacto:", contacto);
        return fetch("https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contacto),
        })
          .then((response) => {
            console.log("Respuesta de la API:", response);
            if (response.ok) {
              return response.json(); // Asegurarse de manejar la respuesta
            } else {
              throw new Error("Error al agregar contacto: " + response.statusText);
            }
          })
          .then(() => {
            return getActions().obtenerContactos(); // Asegurarse de devolver la promesa
          })
          .catch((error) => {
            console.error("Error al agregar contacto:", error);
          });
      },

      actualizarContacto: (id, contactoActualizado) => {
        return fetch(`https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactoActualizado),
        })
          .then(response => {
            if (response.ok) {
              return response.json(); // Asegurarse de manejar la respuesta
            } else {
              throw new Error("Error al actualizar contacto: " + response.statusText);
            }
          })
          .then(() => {
            return getActions().obtenerContactos(); // Asegurarse de devolver la promesa
          })
          .catch(error => {
            console.error("Error al actualizar contacto:", error);
          });
      },

      deleteContact: (contactID) => {
        const requestOption = {
          method: "DELETE",
          redirect: "follow",
        };
        // Eliminar localmente del store
        const updatedContacts = getStore().contacts.filter(contact => contact.id !== contactID);
        setStore({ contacts: updatedContacts });

        return fetch(`https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${contactID}`, requestOption)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error al eliminar contacto: " + response.statusText);
            }
          })
          .then(result => {
            console.log("Contacto eliminado:", result);
          })
          .catch((error) => {
            console.error("Error al eliminar contacto:", error);
            throw error; // Propagar el error para que pueda ser capturado en la interfaz
          });
      },

      loadSomeData: () => {
        return fetch("https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts")
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error al obtener datos: " + response.statusText);
            }
          })
          .then((data) => {
            setStore({ contacts: Array.isArray(data.contacts) ? data.contacts : [] }); // Manejar caso donde data.contacts no es un array
          })
          .catch((error) => {
            console.error("Error al obtener datos:", error);
          });
      },

      // Otras acciones pueden ir aquí...
    },
  };
};

export default getState;
