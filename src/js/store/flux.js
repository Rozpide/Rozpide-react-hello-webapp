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
            if (data && Array.isArray(data.contacts)) {
              setStore({ contacts: data.contacts });
            } else {
              setStore({ contacts: [] });
            }
          })
          .catch((error) => {
            console.error("Error al obtener contactos:", error);
            setStore({ contacts: [] });
          });
      },

      agregarContacto: (contacto) => {
        return fetch("https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contacto),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Error al agregar contacto: " + response.statusText);
            }
          })
          .then(() => getActions().obtenerContactos())
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
              return response.json();
            } else {
              throw new Error("Error al actualizar contacto: " + response.statusText);
            }
          })
          .then(() => getActions().obtenerContactos())
          .catch(error => {
            console.error("Error al actualizar contacto:", error);
          });
      },

      deleteContact: (contactID) => {
        const requestOption = {
          method: "DELETE",
          redirect: "follow",
        };
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
          });
      },
    },
  };
};

export default getState;
