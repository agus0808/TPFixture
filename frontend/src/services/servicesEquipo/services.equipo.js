import axios from "axios"

const URL = "http://localhost:8080/equipos"


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