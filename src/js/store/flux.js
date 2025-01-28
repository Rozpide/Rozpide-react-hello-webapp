
const getState = ({ getStore, getActions, setStore }) => {
    return {
      store: {
        contacts: [] // Estado inicial bien definido
      },
      actions: {

        obtenerContactos: () => {
            return fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts')
              .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Error al obtener contactos: ' + response.statusText);
                }
              })
              .then(data => {
                 if (data && Array.isArray(data.contacts)) {
                  setStore({ contacts: data.contacts });
                  console.log('Contactos actualizados:', data.contacts);
                } else {
                  console.error('La respuesta no es un array:', data);
                  setStore({ contacts: [] }); // Asegurarse de que siempre es un array
                }
              })
              .catch(error => {
                console.error('Error al obtener contactos:', error);
                setStore({ contacts: [] }); // En caso de error, asegurarse de que siempre es un array
                throw error; // Propagar el error para que pueda ser capturado en `useEffect`
              });
          },

        /*obtenerContactos: () => {
          return fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts')
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
        },*/
        agregarContacto: (contact) => {
          console.log('Enviando datos de contacto:', contact);
          return fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(contact),
          })
          .then(response => {
            console.log('Respuesta de la API:', response);
            if (response.ok) {
              return getActions().obtenerContactos();
            } else {
              throw new Error('Error al agregar contacto: ' + response.statusText);
            }
          })
          .catch(error => {
            console.error('Error al agregar contacto:', error);
          });
        },
        deleteContact: (contactID) => {
          const requestOption = {
            method: 'DELETE',
            redirect: 'follow'
          };
          return fetch(`https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts/${contactID}`, requestOption)
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              return getActions().obtenerContactos(); // Refrescar la lista de contactos después de eliminar uno
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        },
        loadSomeData: () => {
          return fetch('https://playground.4geeks.com/contact/agendas/AgendaRozpide/contacts')
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
        // Otras acciones pueden ir aquí...
      }
    };
  };
  
  export default getState;
  