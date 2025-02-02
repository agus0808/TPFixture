import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"; 
import Navbar from "./Navbar";


export default function Menu(){
    
    return (
        <body>
            <Navbar/>
            <div id="card-area">
                <div className="wrapper">
                    <div className="box-area">
                        <div className="box">
                            <img alt="Selección" src="./equipo.jpg"/>
                            <div className="overlay">
                                <h3>Equipos</h3>
                                <p>Los equipos son más que solo jugadores; son familia, unidad y la búsqueda constante de la grandeza en cada encuentro.</p>
                                <Link to="/equipos" className="menu-link link btn btn-success">Equipos</Link>
                            </div>
                        </div>
                        <div className="box">
                            <img alt="" src="./messi.jfif"/>
                            <div className="overlay">
                                <h3>Jugadores</h3>
                                <p>Los jugadores son los protagonistas del espectáculo, demostrando destreza, determinación y talento en cada partido.</p>
                                <Link to="/jugadores" className="menu-link link btn btn-success">Jugadores</Link>
                            </div>
                        </div>
                        <div className="box">
                            <img alt="" src="./partido.avif"/>
                            <div className="overlay">
                                <h3>Partidos</h3>
                                <p>Sumergite en la emoción y la pasión del fútbol: cada partido es una historia de habilidad, estrategia y corazón en el césped.</p>
                                <Link to="/partidos" className="menu-link link btn btn-success">Partidos</Link>
                            </div>
                        </div>
                        <div className="box">
                            <img alt="" src="./estadistica.jpeg"/>
                            <div className="overlay">
                                <h3>Estadísticas</h3>
                                <p>Las estadísticas son la ventana al pasado y la guía hacia el futuro, revelando los récords, logros y estrategias que definen el juego del fútbol.</p>
                                <Link to="/estadisticas" className="menu-link link btn btn-success">Estadisticas</Link>
                            </div>
                        </div>
                        <div className="box">
                            <img alt="" src="./estadio.jpg"/>
                            <div className="overlay">
                                <h3>Estadios</h3>
                                <p>Los estadios son templos del fútbol, donde la historia se escribe entre las gradas rugientes y el césped sagrado.</p>
                                <Link to="/estadios" className="menu-link link btn btn-success">Estadios</Link>
                            </div>
                        </div>
                        <div className="box">
                            <img alt="" src="./reservas.png"/>
                            <div className="overlay">
                                <h3>Reservas</h3>
                                <p>Reserva tu lugar en la cancha y asegura tu espacio para disfrutar de partidos llenos de adrenalina y diversión con amigos y familia.</p>
                                <Link to="/reservas" className="menu-link link btn btn-success">Reservas</Link>
                            </div>
                        </div>
                        <div className="box">
                            <img alt="" src="./integrantes.jfif"/>
                            <div className="overlay">
                                <h3>Integrantes</h3>
                                <p>Los integrantes del grupo son personas comprometidas, colaborativas y motivadas, trabajando juntos hacia metas comunes con entusiasmo y dedicación.</p>
                                <Link to="/integrantes" className="menu-link link btn btn-success">Integrantes</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
};




