const URL = "https://app-d3332d36-f917-4f80-b18d-b7f2d7e14f00.cleverapps.io/estadios"



const getAll = async(filter) => {
    const url = (filter)?URL+"?nombre="+filter:URL
    const res = await fetch(url, {method:"GET"})
    return await res.json()
}

const save = async(data) => {
    let res = null
    if (data.estadio_id !== undefined) {
        const url = URL + "/" + data.estadio_id
        res = await fetch(url, {method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)})
    } else {
        res = await fetch(URL, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)})
    }
    return await res.json()
}

const remove = async(id) => {
    const URL_id = URL + "/" + id
    const res = await fetch(URL_id, {method:"DELETE"})
    return res
}

export const servicesEstadio = {remove, getAll, save}