const {Equipos} = require("../tablas/equipo");
const {Jugadores} = require("../tablas/jugador");
const {Op} = require("sequelize");


// Funciones para la tabla Equipo
async function getAllEquipo(filters) {
    const whereQuery = {}
    if(filters){
        if(filters.nombre){
            whereQuery.nombre = { [Op.like]: `%${filters.nombre}%`}  
        }
    }
    const resultado = await Equipos.findAll({
        where: whereQuery,
        attributes: [
            'equipo_id',
            'nombre',
            'ciudad',
            'fechaFundacion',
            'eliminado',
        ],
        order: [['nombre', 'ASC']]
    })
    return resultado.map(p => {
        return {
            equipo_id: p.dataValues.equipo_id,
            nombre: p.dataValues.nombre,
            ciudad: p.dataValues.ciudad,
            fechaFundacion: p.dataValues.fechaFundacion,
            eliminado: p.dataValues.eliminado
        }
    })
}

async function getByIdEquipo(id) {

    const equiEncontrado = await Equipos.findOne({
        where : {
            equipo_id : id
        }
    })

    return equiEncontrado
}

async function postEquipo(nombre, ciudad, fechaFundacion) { 

    const nuevoEquipo = await Equipos.create({
        nombre : nombre,
        ciudad : ciudad,
        fechaFundacion : fechaFundacion,
    })

    return nuevoEquipo
}

async function putEquipo(id, { nombre, ciudad, fechaFundacion }) {
    try {
        const equipo = await Equipos.findOne({
            where: { equipo_id: id }
        });

        if (equipo) {
            equipo.nombre = nombre;
            equipo.ciudad = ciudad;
            equipo.fechaFundacion = fechaFundacion;

            await equipo.save()

            return equipo;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error al actualizar el equipo:", error);
        throw error;
    }
}

async function deleteEquipo(id) {

    const eliminar = await Equipos.findOne({
        where : {
            equipo_id : id,
            eliminado : false
        }
    })

    const updateEquipo = await Equipos.update(
        {
            eliminado: true
        },
        {
            where: { equipo_id : id}
        });
    
    return { updateEquipo}

}

module.exports = {getAllEquipo, getByIdEquipo, postEquipo, putEquipo, deleteEquipo}