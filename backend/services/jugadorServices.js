const {Equipos} = require("../tablas/equipo");
const {Jugadores} = require("../tablas/jugador");
const {Op, Sequelize} = require("sequelize");


// Funciones para la tabla Jugadores
async function getAllJugador(filters) {
    const whereQuery = {}
    if(filters){
        if(filters.nombre){
            whereQuery.nombre = { [Op.like]: `%${filters.nombre}%`}  
        }
    }
    const resultado = await Jugadores.findAll({
        where: whereQuery,
        attributes: [
            'jugador_id',
            'nombre',
            'fechaNacimiento',
            'lugarNacimiento',
            'edad',
            'eliminado',
            'equipo_id'
        ],
        order: [['nombre', 'ASC']],
        include: [{
            model: Equipos,
            required: true,
            attributes: ['nombre'], // Incluir solo el nombre del equipo
            where: { id: Sequelize.col('Jugadores.equipo_id') }
           }]
    })
    return resultado.map(p => {
        return {
            jugador_id: p.dataValues.jugador_id,
            nombre: p.dataValues.nombre,
            fechaNacimiento: p.dataValues.fechaNacimiento,
            lugarNacimiento: p.dataValues.lugarNacimiento,
            edad: p.dataValues.edad,
            eliminado: p.dataValues.eliminado,
            equipo_id: p.dataValues.equipo_id,
            equipoNombre : p.dataValues.Equipo.nombre
        }
    })
}

async function getByIdJugador(id) {

    const jugEncontrado = await Jugadores.findOne({
        where : {
            jugador_id : id
        }
    })

    return jugEncontrado
}

async function postJugador(nombre, fechaNacimiento, lugarNacimiento, edad, equipo_id) { 

    const nuevoJugador = await Jugadores.create({
        nombre : nombre,
        fechaNacimiento : fechaNacimiento,
        lugarNacimiento : lugarNacimiento,
        edad : edad,
        equipo_id : equipo_id
    })

    return nuevoJugador
}

async function putJugador(id, {nombre, fechaNacimiento, lugarNacimiento, edad, equipo_id}) {

    const enc = await Jugadores.findOne({
        where : {
            jugador_id : id
        }
    })

    if (enc != undefined) {
        enc.nombre = nombre,
        enc.fechaNacimiento = fechaNacimiento,
        enc.lugarNacimiento = lugarNacimiento,
        enc.edad = edad,
        enc.equipo_id = equipo_id
    }
    await enc.save()
    return enc
}

async function deleteJugador(id) {

    const eliminar = await Jugadores.findOne({
        where : {
            jugador_id : id,
            eliminado : false
        }
        
    })

    const updateJug = await Jugadores.update(
        {
            eliminado: true
        },
        {
            where: { jugador_id : id}
        });
    
    return { updateJug}
}

module.exports = {getAllJugador, getByIdJugador, postJugador, putJugador, deleteJugador}