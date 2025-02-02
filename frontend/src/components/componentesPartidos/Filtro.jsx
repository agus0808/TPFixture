import React, { useState } from "react";
import "../styles.css"

export default function Filtro({ onFiltrar }) {
    const [filter, setFilter] = useState({fechaDesde: "", fechaHasta: ""})
    const [errorFecha, setErrorFecha] = useState("")

    const onClickFiltrar = () => {
        if ((!filter.fechaDesde && !filter.fechaHasta) || (filter.fechaDesde && filter.fechaHasta) ) {
            setErrorFecha("")
            onFiltrar(filter)
            return
        }

        if (!filter.fechaDesde || !filter.fechaHasta) {
           setErrorFecha("Debe ingresar ambas fechas")
           return
        }
        if (filter.fechaDesde > filter.fechaHasta) {
            setErrorFecha("Fecha Desde no puede ser mayor que Fecha Hasta")
            return
        }

    };

    const handleFechaDesdeChange = (e) => {
        setFilter({ ...filter, fechaDesde: e.target.value });
    };

    const handleFechaHastaChange = (e) => {
        setFilter({ ...filter, fechaHasta: e.target.value });
    };
  
    return (
      <div className="card mb-3">
          <div className="card-header">
              <h6>Filtrar por fecha</h6>
          </div>
          <div className="card-body">
              <div className="row justify-content-center">
                  <div className="form-group d-flex col-md-4 justify-content-center">
                      <label htmlFor="fechaDesde"> Desde: </label>
                      <input
                          type="date"
                          id="fechaDesde"
                          className="form-control mx-3"
                          value={filter.fechaDesde}
                          onChange={handleFechaDesdeChange}
                      />
                  </div>

                  <div className="form-group d-flex col-md-4 justify-content-center">
                      <label htmlFor="fechaHasta"> Hasta: </label>
                      <input type="date"
                          id="fechaHasta"
                          className="form-control mx-3"
                          value={filter.fechaHasta}
                          onChange={handleFechaHastaChange}
                      />
                  </div>
              </div>
              {errorFecha && <span className="error d-flex justify-content-center">{errorFecha}</span>}
              <button className="btn btn-primary" onClick={onClickFiltrar}>
                  Consultar
              </button>
          </div>
      </div>
  );
  }