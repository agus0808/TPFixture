const { Op } = require("sequelize")
const {Estadisticas} = require("../tablas/Estadistica.js");


// Función que permite obtener todas las estadisticas o un filtro de ellas
async function getAllEstadisticas(filters) {
    const whereQuery = {}
    if(filters){
        if(filters.partido_id){
            whereQuery.partido_id = { [Op.like]: `%${filters.partido_id}%`}  
        }
    }
    const resultado = await Estadisticas.findAll({
        where: whereQuery,
        attributes: [
            'estadistica_id',
            'cant_goles',
            'cant_asistencias',
            'jugador_id',
            'partido_id',
            'eliminado'
        ],
        order: [['estadistica_id', 'ASC']]
    })
    return resultado.map(p => {
        return {
            estadistica_id: p.dataValues.estadistica_id,
            cant_goles: p.dataValues.cant_goles,
            cant_asistencias: p.dataValues.cant_asistencias,
            jugador_id: p.dataValues.jugador_id,
            partido_id: p.dataValues.partido_id,
            eliminado: p.dataValues.eliminado
        }
    })
}

// Función que permite obtener una estadistica por identificador
async function getByIdEstadistica(id) {

    const estadisticaEncontrada = await Estadisticas.findOne({
        where : {
            estadistica_id : id
        }
    })

    return estadisticaEncontrada
}

// Función que permite registrar una estadistica
async function postEstadistica(cant_goles, cant_asistencias, jugador_id, partido_id) { 

    const nuevaEstadistica = await Estadisticas.create({
        cant_goles: cant_goles, 
        cant_asistencias: cant_asistencias,
        jugador_id: jugador_id,
        partido_id: partido_id
    })

    return nuevaEstadistica
}

// Función que permite modificar una estadistica por su id
async function putEstadistica(id, {cant_goles, cant_asistencias, jugador_id, partido_id}) {

    const estadisticaEncontrada = await Estadisticas.findOne({
        where : {
            estadistica_id : id
        }
    })

    if (estadisticaEncontrada != undefined) {
        estadisticaEncontrada.cant_goles = cant_goles,
        estadisticaEncontrada.cant_asistencias = cant_asistencias,
        estadisticaEncontrada.jugador_id = jugador_id,
        estadisticaEncontrada.partido_id = partido_id
    }
    await estadisticaEncontrada.save()
    return estadisticaEncontrada
}

// Función que permite borrar una estadistica
async function deleteEstadistica(id) {

    const updateEstadistica = await Estadisticas.update(
        {
            eliminado: true
        },
        {
            where: { estadistica_id : id}
        });

    return { updateEstadistica }
}

module.exports = {getAllEstadisticas, getByIdEstadistica, postEstadistica, putEstadistica, deleteEstadistica}