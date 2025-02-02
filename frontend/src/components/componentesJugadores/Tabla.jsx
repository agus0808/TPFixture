import { Link } from "react-router-dom";

export default function Tabla(props) {

    const onClickEliminar = async(id) => {
        if (window.confirm("Desea eliminar el jugador?"))
            props.onEliminar(id);
    };

    const onActualizarClick = async(item) => {
        props.onActualizar(item);
    };

    const tdata = props.rows.map((e) => {
        return (
            <tr key={e.jugador_id}>
                <td>{e.nombre}</td>
                <td>{e.fechaNacimiento}</td>
                <td>{e.lugarNacimiento}</td>
                <td>{e.edad}</td>
                <td>{e.equipoNombre}</td>
                <td>
                    <button className="btn btn-danger" disabled={e.eliminado === true} onClick={() => { onClickEliminar(e.jugador_id) }}>Eliminar</button>
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
                    <h6>Jugadores del campeonato</h6>
                    <div>
                        <button className="btn btn-success me-2" onClick={props.onRegistro}>Nuevo Jugador</button>
                        <Link to="/" className="btn btn-primary">Menu Principal</Link>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Fecha Nacimiento</th>
                                <th>Lugar Nacimiento</th>
                                <th>Edad</th>
                                <th>Nombre Equipo</th>
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