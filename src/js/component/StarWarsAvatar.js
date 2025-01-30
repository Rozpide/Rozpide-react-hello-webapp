import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const StarWarsAvatar = ({ id }) => {
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(`https://swapi.dev/api/people/${id}/`);
        if (!response.ok) {
          throw new Error('Error al obtener datos');
        }
        const data = await response.json();
        const avatarUrl = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`; // URL de ejemplo para las imágenes
        setAvatar(avatarUrl);
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
