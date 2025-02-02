import React, { useState } from "react";
import "../styles.css"

export default function Filtro({ onFiltrar }) {
    const [filter, setFilter] = useState("");

    const onClickFiltrar = () => {
        onFiltrar(filter);
    };

    return (
        <div className="card mb-3">
            <div className="card-header">
                <h6>Filtrar por nombre</h6>
            </div>
            <div className="card-body">
                <h6>Ingrese el nombre a filtrar</h6>
                <div className="form-group">
                    <input type="text" className="form-control" onChange={(e) => setFilter(e.target.value)}/>
                </div>
                <button className="btn btn-primary" onClick={onClickFiltrar}>Consultar</button>
            </div>
        </div>
    );
}