import { Link } from "react-router-dom";

export default function Tabla(props) {

    const onClickEliminar = async(id) => {
        if (window.confirm("Desea eliminar el partido?"))
            props.onEliminar(id);
    };

    const onActualizarClick = async(item) => {
        props.onActualizar(item);
    };

    const tdata = props.rows.map((e) => {
        return (
            <tr key={e.partido_id}>
                <td>{e.fecha}</td>
                <td>{e.resultado}</td>
                <td>{e.equipo_local}</td>
                <td>{e.equipo_visitante}</td>
                <td>
                    <button className="btn btn-danger" disabled={e.eliminado === true} onClick={() => { onClickEliminar(e.partido_id) }}>Eliminar</button>
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
                    <h6>Partidos del campeonato</h6>
                    <div>
                        <button className="btn btn-success me-2" onClick={props.onRegistro}>Nuevo partido</button>
                        <Link to="/" className="btn btn-primary">Menu Principal</Link>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Resultado</th>
                                <th>Id del equipo local</th>
                                <th>Id del equipo visitante</th>
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