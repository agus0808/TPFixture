import React from "react";
import "./Navbar.css"
import { Link } from "react-router-dom"
export default function Navbar() {


    return <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    - TPI DDS - 
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/equipos" className="nav-link">
                                Equipos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/jugadores" className="nav-link">
                                Jugadores
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/estadios" className="nav-link">
                                Estadios
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/reservas" className="nav-link">
                                Reservas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/estadisticas" className="nav-link">
                                Estadísticas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/partidos" className="nav-link">
                                Partidos
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/entrenadores" className="nav-link">
                                Entrenadores
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sesiones-entrenamiento" className="nav-link">
                                Sesiones
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}