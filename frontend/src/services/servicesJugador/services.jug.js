import axios from "axios"

const URL = "http://localhost:8080/jugadores"


const getAll = async(filter) => {
    const url = (filter)?URL+"?nombre="+filter:URL
    const res = await axios.get(url)
    return res
}

const getNombresEquipos = async() => {

    const urlNueva = "http://localhost:8080/equipos"
    const res = await axios.get(urlNueva)
    const datos = res.data
    return datos.map((e) => {
        return (
            {
                nombre : e.nombre,
                equipo_id : e.equipo_id
            }
        )
    })
    
}
const save = async(data) => {

    let res = null
    
    if (data.jugador_id !== undefined) {
        const url = URL + "/" + data.jugador_id
        res = await axios.put(url, data)
    } else {
        res = await axios.post(URL, data)
        
    }

    return res
}

const remove = async(id) => {

    const URLNueva = URL + "/" + id
    const res = await axios.delete(URLNueva)

    return res
}

export default {remove, getAll, save, getNombresEquipos}