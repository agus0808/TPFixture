
import {useState, useEffect} from "react"
import servicesEquipo from "../../services/servicesEquipo/services.equipo"
import Tabla from "./Tabla"
import Registro from "./Registro"
import "../styles.css"
import Filtro from "./Filtro"

export default function Equipos() {

    const [action, setAction] = useState("T") 
    const [rows, setRows] = useState([])
    const [item, setItem] = useState({})

    
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async(filter) => {
        const res = await servicesEquipo.getAll(filter)
        setRows(res.data)
    }

    

    const onSubmit = async(data) => {
        await servicesEquipo.save(data)
        await loadData()
        setAction("T")
    }

    const onRegistro = () => {
        setAction("R")
    }

    const onEliminar = async(id) => {
        await servicesEquipo.remove(id)
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