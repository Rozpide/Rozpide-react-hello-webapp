import React , { useContext }from "react";
import { Context } from "../store/appContext";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	console.log(store.contacts);
	function cambiarTexto() {
		store.contacts = "Texto cambiado";
	}
	return (
		<>
		<p>{store.contacts}</p>
		<div className="text-center mt-5">

			

			<h1>Hello Rigo!</h1>
			<p>
				<img src={rigoImage} />
			</p>
			<a href="#" className="btn btn-success">
				If you see this green button, bootstrap is working
			</a>
			
			<p>
				<button onClick={actions.changeText}>Cambiar texto</button>
			</p>
		</div>
		</>
	);
}
