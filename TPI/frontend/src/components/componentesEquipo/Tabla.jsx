import { Link } from "react-router-dom";

export default function Tabla(props) {

    const onClickEliminar = async(id) => {
        if (window.confirm("Desea eliminar el equipo?"))
            props.onEliminar(id);
    };

    const onActualizarClick = async(item) => {
        props.onActualizar(item);
    };

    const tdata = props.rows.map((e) => {
        return (
            <tr key={e.equipo_id}>
                <td>{e.nombre}</td>
                <td>{e.ciudad}</td>
                <td>{e.fechaFundacion}</td>
                <td>
                    <button className="btn btn-danger" disabled={e.eliminado === true} onClick={() => { onClickEliminar(e.equipo_id) }}>Eliminar</button>
                </td>
                <td>
                    <button className="btn btn-warning" disabled={e.eliminado === true} onClick={() => { onActualizarClick(e) }}>Actualizar</button>
                </td>
            </tr>
        );
    });

    return (
        <>
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h6>Equipos del campeonato</h6>
                    <div>
                        <button className="btn btn-success me-2" onClick={props.onRegistro}>Nuevo Equipo</button>
                        <Link to="/" className="btn btn-primary">Menu Principal</Link>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Ciudad</th>
                                <th>Fecha fundacion</th>
                                <th>Eliminar</th>
                                <th>Actualizar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tdata}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}