const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";
const URL = `${API_URL}/estadisticas`

const getAll = async(filter) => {

    const url = (filter)?URL+"?partido_id="+filter:URL
    const res = await fetch(url, {method:"GET"})
    return await res.json()
}

const save = async(data) => {

    let res = null
    
    if (data.estadistica_id !== undefined) {
        const url = URL + "/" + data.estadistica_id
        res = await fetch(url, {method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)})
    } else {
        res = await fetch(URL, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)})
        
    }

    return await res.json()
}

const remove = async(id) => {

    const URLNueva = URL + "/" + id
    const res = await fetch(URLNueva, {method:"DELETE"})

    return res
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {remove, getAll, save}