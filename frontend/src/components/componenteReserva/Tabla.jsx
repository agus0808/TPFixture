import { Link } from "react-router-dom";

export default function Tabla(props) {

    const onClickEliminar = async(id) => {
        if (window.confirm("Desea eliminar la reserva?"))
            props.onEliminar(id);
    };

    const onActualizarClick = async(item) => {
        props.onActualizar(item);
    };

    const tdata = props.rows.map((e) => {
        return (
            <tr key={e.reserva_id}>
                <td>{e.reserva_id}</td>
                <td>{e.hora}</td>
                <td>{e.fechaReserva}</td>
                <td>{e.estadio_id}</td>
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
                    <h6>Reservas</h6>
                    <div>
                        <button className="btn btn-success me-2" onClick={props.onRegistro}>Nueva reserva</button>
                        <Link to="/" className="btn btn-primary">Menu Principal</Link>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID reserva</th>
                                <th>Hora</th>
                                <th>Fecha de reserva</th>
                                <th>ID estadio</th>
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