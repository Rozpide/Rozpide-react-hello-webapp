const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [], // Estado inicial bien definido para evitar errores
    },
    actions: {
      obtenerContactos: () => {
        return fetch("https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts")//obtener contactos de la API
          .then((response) => {//almacenar la respuesta en response
            if (response.ok) {//si la respuesta es correcta 
              return response.json();//retornar la respuesta en formato json
            } else {//sino
              throw new Error("Error al obtener contactos: " + response.statusText);//lanzar un error
            }
          })
          .then((data) => {//almacenar la data en data
            if (data && Array.isArray(data.contacts)) {//si data y data.contacts es un array
              setStore({ contacts: data.contacts });//almacenar data.contacts en setStore
            } else {//sino
              setStore({ contacts: [] });//almacenar un array vacio en setStore
            }
          })//si hay un error
          .catch((error) => {//almacenar el error en error
            console.error("Error al obtener contactos:", error);//mostrar en consola "Error al obtener contactos:"
            setStore({ contacts: [] });//almacenar un array vacio en setStore
          });
      },

      agregarContacto: (contacto) => {//definir agregarContacto con contacto como parametro
        return fetch("https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts", {//agregar contacto a la API
          method: "POST",//metodo POST
          headers: {
            "Content-Type": "application/json",//tipo de contenido application/json
          },
          body: JSON.stringify(contacto),//convertir contacto en formato json 
        })
          .then((response) => {//almacenar la respuesta en response 
            if (response.ok) {//si la respuesta es correcta 
              return response.json();//retornar la respuesta en formato json 
            } else {//sino
              throw new Error("Error al agregar contacto: " + response.statusText);//lanzar un error
            }
          })
          .then(() => getActions().obtenerContactos())
          .catch((error) => {
            console.error("Error al agregar contacto:", error);
          });
      },

      actualizarContacto: (id, contactoActualizado) => {//definir actualizarContacto con id, contactoActualizado como parametros
        return fetch(`https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${id}`, {//actualizar contacto en la API con id como parametro 
          method: "PUT",//metodo PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({//convertir contactoActualizado en formato json 
            name: contactoActualizado.name,
            phone: contactoActualizado.phone,
            email: contactoActualizado.email,
            address: contactoActualizado.address
          }),
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

      deleteContact: (contactID) => {//definir deleteContact con contactID como parametro 
        const requestOption = {//definir requestOption 
          method: "DELETE",//metodo DELETE 
          redirect: "follow",//redireccionar 
        };
        const updatedContacts = getStore().contacts.filter(contact => contact.id !== contactID);//almacenar los contactos actualizados en updatedContacts 
        setStore({ contacts: updatedContacts });//almacenar updatedContacts en setStore

        return fetch(`https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${contactID}`, requestOption)//eliminar contacto de la API con contactID como parametro 
          .then((response) => {
            if (response.ok) {//si la respuesta es correcta
              return response.json();//retornar la respuesta en formato json 
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
