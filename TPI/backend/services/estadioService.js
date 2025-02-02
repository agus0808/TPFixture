const { Op } = require("sequelize")
const {Estadio} = require("../tablas/estadio")

//Función que permite obtener todos los estadios
async function getAllEstadios(filters) {
    const whereQuery = {}
    if (filters) {
        if (filters.nombre) {
            whereQuery.nombre = {[Op.like]: `%${filters.nombre}%`}
        }
    }

    const estadios = await Estadio.findAll({
        where: whereQuery,
        attributes: [
            "estadio_id",
            "nombre",
            "capacidad",
            "fechaConstruccion",
            "equipo_id",
            "eliminado"
        ],
        order: [["nombre", "ASC"]]
    })
    return estadios.map(e => {
        return {
            estadio_id: e.dataValues.estadio_id,
            nombre: e.dataValues.nombre,
            capacidad: e.dataValues.capacidad,
            fechaConstruccion: e.dataValues.fechaConstruccion,
            equipo_id: e.dataValues.equipo_id,
            eliminado: e.dataValues.eliminado
        }
    })
}

//Función que permite obtener un estadio por id
async function getByIdEstadio(id) {
    const estadio = await Estadio.findOne({
        where: {
            estadio_id : id
        }
    })
    return estadio
}

//Función que permite registrar un estado
async function postEstadio(nombre, capacidad, fechaConstruccion, equipo_id) {
    const nuevoEstadio = await Estadio.create({
        nombre: nombre,
        capacidad: capacidad,
        fechaConstruccion: fechaConstruccion,
        equipo_id: equipo_id
    })

    return nuevoEstadio
}

//Función que permite modificar un estadio mediante su id
async function putEstadio(id, {nombre, capacidad, fechaConstruccion, equipo_id}) {
    try {
        const estadio = await Estadio.findOne({
            where: {
                estadio_id: id
            }
        })

        if (estadio) {
            estadio.nombre = nombre,
            estadio.capacidad = capacidad,
            estadio.fechaConstruccion = fechaConstruccion,
            estadio.equipo_id = equipo_id
            
            await estadio.save()
            return estadio
        }
        return null

    } catch (error) {
        console.error("Error al actualizar estadio:", error)
        throw error
    }
}

//Función que permite borrar un estadio
async function deleteEstadio(id) {
    const estadio = await Estadio.findOne({
        where: {
            estadio_id: id
        }
    })

    if (estadio) {
        const actEstadio = await Estadio.update(
            {
                eliminado: true
            },
            {
                where: {estadio_id: id}
            }
        )
        return actEstadio
    }   
    return null
}

module.exports = {getAllEstadios, getByIdEstadio, postEstadio, putEstadio, deleteEstadio}