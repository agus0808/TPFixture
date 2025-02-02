import React from 'react';
import { Link } from 'react-router-dom';
import './Integrantes.css';

export default function Integrantes() {
    const integrantes = [
        { nombre: "Agustin", apellido: "Hillar" }
    ];

    const tdata = integrantes.map((i, index) => (
        <tr key={index}>
            <td>{i.nombre}</td>
            <td>{i.apellido}</td>
        </tr>
    ));

    return (
        <>
            <div className="card" id='divdiv'>
                <div className="card-header d-flex justify-content-between align-items-center" id='segdiv'>
                    <h6>Integrantes del grupo - 3k07</h6>
                    <div>
                        <Link to="/" className="btn btn-primary">Menu Principal</Link>
                    </div>
                </div>
                <div className="card-body" id='divbody'>
                    <div className="table-container">
                        <table className="table table-striped" id='tabla'>
                            <thead>
                                <tr>
                                    <th>Nombre/s</th>
                                    <th>Apellido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tdata}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}