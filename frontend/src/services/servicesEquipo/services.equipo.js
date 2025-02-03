import axios from "axios"
const API_URL ="app-d3332d36-f917-4f80-b18d-b7f2d7e14f00.cleverapps.io"
const URL = `${API_URL}/equipos`


const getAll = async(filter) => {

    const url = (filter)?URL+"?nombre="+filter:URL
    const res = await axios.get(url)
    return res
}

const save = async(data) => {

    let res = null
    
    if (data.equipo_id !== undefined) {
        const url = URL + "/" + data.equipo_id
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

export default {remove, getAll, save}