const {Op} = require("sequelize");
const {Partidos} = require("../tablas/Partido.js");


// Función que permite obtener todos los partidos o un filtro de éstos
async function getAllPartidos(filters) {
    const whereQuery = {}
    if (filters) {
        if (filters.fechaDesde && filters.fechaHasta) {
            whereQuery.fecha = {[Op.between]: [filters.fechaDesde, filters.fechaHasta]}
        }
    }

    const resultado = await Partidos.findAll({
        where: whereQuery,
        attributes: [
            'partido_id',
            'fecha',
            'resultado',
            'equipo_local',
            'equipo_visitante',
            'eliminado'
        ],
        order: [['partido_id', 'ASC']]
    })
    return resultado.map(p => {
        return {
            partido_id: p.dataValues.partido_id,
            fecha: p.dataValues.fecha,
            resultado: p.dataValues.resultado,
            equipo_local: p.dataValues.equipo_local,
            equipo_visitante: p.dataValues.equipo_visitante,
            eliminado: p.dataValues.eliminado
        }
    })
}

// Función que permite obtener un partido por identificador
async function getByIdPartido(id) {

    const partidoEncontrado = await Partidos.findOne({
        where : {
            partido_id : id
        }
    })

    return partidoEncontrado
}

// Función que permite registrar un partido
async function postPartido(fecha, resultado, equipo_local, equipo_visitante) { 

    const nuevoPartido = await Partidos.create({
        fecha: fecha,
        resultado: resultado,
        equipo_local: equipo_local,
        equipo_visitante: equipo_visitante
    })

    return nuevoPartido
}

// Función que permite modificar un partido de acuerdo a su id
async function putPartido(id, {fecha, resultado, equipo_local, equipo_visitante}) {

    const partidoEncontrado = await Partidos.findOne({
        where : {
            partido_id : id
        }
    })

    if (partidoEncontrado != undefined) {
        partidoEncontrado.fecha = fecha,
        partidoEncontrado.resultado = resultado,
        partidoEncontrado.equipo_local = equipo_local,
        partidoEncontrado.equipo_visitante = equipo_visitante
    }
    await partidoEncontrado.save()
    return partidoEncontrado
}

// Función que permite borrar un partido
async function deletePartido(id) {

    const updatePartido = await Partidos.update(
        {
            eliminado: true
        },
        {
            where: { partido_id : id}
        });

    return { updatePartido }
}

module.exports = {getAllPartidos, getByIdPartido, postPartido, putPartido, deletePartido}