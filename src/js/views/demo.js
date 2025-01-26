import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    const [formVisible, setFormVisible] = useState(false);
    const [contacto, setContacto] = useState({
        nombre: '',
        telefono: '',
        correo: '',
        direccion: ''
    });

    const handleChange = (e) => {
        setContacto({
            ...contacto,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.agregarContacto(contacto);
        setContacto({ nombre: '', telefono: '', correo: '', direccion: '' });
        setFormVisible(false);
    };

    return (
        <div className="container">
            <ul className="list-group">
                {store.demo.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between" style={{ background: item.background }}>
                        <Link to={"/single/" + index}>
                            <span>Link to: {item.title}</span>
                        </Link>
                        {formVisible && (
                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre:</label>
                                    <input type="text" className="form-control" id="nombre" name="nombre" value={contacto.nombre} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="telefono">Teléfono:</label>
                                    <input type="text" className="form-control" id="telefono" name="telefono" value={contacto.telefono} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="correo">Correo Electrónico:</label>
                                    <input type="email" className="form-control" id="correo" name="correo" value={contacto.correo} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="direccion">Dirección:</label>
                                    <input type="text" className="form-control" id="direccion" name="direccion" value={contacto.direccion} onChange={handleChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Aceptar</button>
                            </form>
                        )}
                        <button className="btn btn-primary mt-3" onClick={() => setFormVisible(!formVisible)}>
                            {formVisible ? 'Cancelar' : 'Agregar Contacto'}
                        </button>
                    </li>
                ))}
            </ul>
            <br />
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    );
};

