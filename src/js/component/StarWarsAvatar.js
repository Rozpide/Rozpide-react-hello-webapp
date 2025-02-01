import React, { useState, useEffect } from "react";//importamos useState y useEffect
import PropTypes from "prop-types";//importamos PropTypes

const StarWarsAvatar = ({ id }) => {//creamos la funcion StarWarsAvatar y le pasamos el id
  const [avatar, setAvatar] = useState(null);//creamos el estado avatar y setAvatar
  const [error, setError] = useState(false);//creamos el estado error y setError

  useEffect(() => {
    const fetchAvatar = async () => {//creamos la funcion fetchAvatar
      try {//intentar
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);//almacenar la respuesta de la api en response 
        if (!response.ok) {//si la respuesta no es correcta 
          throw new Error('Error al obtener datos');//lanzar un error
        }
        const data = await response.json();//almacenar la respuesta en data
        const avatarUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`; // URL de ejemplo para las imágenes de los personajes
        setAvatar(avatarUrl);//establecer avatarUrl en setAvatar 
      } catch (error) {
        console.error('Error al obtener avatar:', error);
        setError(true);
      }
    };

    fetchAvatar();
  }, [id]);

  return (
    <div className="d-flex align-items-center">
      {error ? (


        <div>Error al cargar avatar</div>
      ) : avatar ? (
        <img src={avatar} alt="Avatar" className="me-2 rounded-circle" style={{ width: '80px', height: '80px' }} />
      ) : (
        <i className="fas fa-spinner fa-spin"></i>
      )}
    </div>
  );
};

StarWarsAvatar.propTypes = {
  id: PropTypes.number.isRequired
};

export default StarWarsAvatar;
