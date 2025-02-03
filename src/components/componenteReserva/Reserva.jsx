import {useState, useEffect} from "react"
import {servicesReserva} from "../../services/serviceReserva/service.reserva"
import Tabla from "./Tabla"
import Registro from "./Registro"
import Filtro from "./Filtro"
import "../styles.css"


export default function Reserva() {

    const [action, setAction] = useState("T") 
    const [rows, setRows] = useState([])
    const [item, setItem] = useState({})

    
    useEffect(() => {
        loadData()
    }, [])
    

    const loadData = async(filter) => {
        const res = await servicesReserva.getAll(filter)
        setRows(res)
    }

    const onSubmit = async(data) => {
        await servicesReserva.save(data)
        await loadData()
        setAction("T")
    }

    const onRegistro = () => {
        setAction("R")
    }

    const onEliminar = async(id) => {
        await servicesReserva.remove(id)
        await loadData()
    }

    const onActualizar = async(item) => {
        setItem(item)
        loadData()
        setAction("R")
    }

    const onVolver = () => {
        setAction("T")
    }

    const onFiltrar = async(filter) => {
        await loadData(filter)
    }

    return <>
        <div className="container_app">
            {
                action === "T" && (
                    <>
                        <Filtro onFiltrar={onFiltrar}></Filtro>
                        <Tabla rows={rows} onRegistro={onRegistro} onEliminar={onEliminar} onActualizar={onActualizar}></Tabla>
                    </>
                )
            }
            {
                action !== "T" && (
                    <Registro onVolver={onVolver} onSubmit={onSubmit} item={item}></Registro>
                )
            }
        </div>
    </>

}