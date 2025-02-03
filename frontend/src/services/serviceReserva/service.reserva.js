const API_URL ="app-d3332d36-f917-4f80-b18d-b7f2d7e14f00.cleverapps.io"
const URL = `${API_URL}/reservas`

const getAll = async(filter) => {
    let url = URL
    if (filter && filter.fechaDesde && filter.fechaHasta)
        {url += `?fechaDesde=${filter.fechaDesde}&fechaHasta=${filter.fechaHasta}`}
    
    const res = await fetch(url, {method:"GET"})
    return await res.json()
}

const save = async(data) => {
    let res = null
    if (data.reserva_id !== undefined) {
        const url = URL + "/" + data.reserva_id
        res = await fetch(url, {method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)})
    } else {
        res = await fetch(URL, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data)})
    }
    return await res.json()
}

const remove = async(id) => {
    const url = URL + "/" + id
    const res = await fetch(url, {method:"DELETE"})
    return res
}

export const servicesReserva = {remove, getAll, save}