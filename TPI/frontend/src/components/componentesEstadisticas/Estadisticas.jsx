import {useState, useEffect} from "react"
import servicesEstadistica from "../../services/servicesEstadistica/services.estadistica"
import Tabla from "./Tabla"
import Registro from "./Registro"
import "../styles.css"
import Filtro from "./Filtro"

export default function Estadisticas() {

    const [action, setAction] = useState("T") 
    const [rows, setRows] = useState([])
    const [item, setItem] = useState({})

    
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async(filter) => {
        const res = await servicesEstadistica.getAll(filter)
        setRows(res)
    }

    

    const onSubmit = async(data) => {
        await servicesEstadistica.save(data)
        await loadData()
        setAction("T")
    }

    const onRegistro = () => {
        setAction("R")
    }

    const onEliminar = async(id) => {
        await servicesEstadistica.remove(id)
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