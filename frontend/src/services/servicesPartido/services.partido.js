const URL = "http://localhost:3001/partidos"


const getAll = async(filter) => {
    let url = URL
    if (filter && filter.fechaDesde && filter.fechaHasta)
        {url += `?fechaDesde=${filter.fechaDesde}&fechaHasta=${filter.fechaHasta}`}
    
    const res = await fetch(url, {method:"GET"})
    return await res.json()
}

const save = async(data) => {

    let res = null
    
    if (data.partido_id !== undefined) {
        const url = URL + "/" + data.partido_id
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