const request = require('supertest');
const { expect } = require('chai');
const { app, sequelize, Jugadores } = require('../app');
const funcionesJugador = require("../services/jugadorServices");
const { DESCRIBE } = require('sequelize/lib/query-types');


// Sincronizar la base de datos 
beforeAll(async function() {
    await sequelize.sync({ force: true });
});

// Limpiar la tabla de equipo antes de cada prueba
beforeEach(async function() {
    try {
        // Desactivar restricciones de clave externa
        await sequelize.query('PRAGMA foreign_keys = OFF');

        // Limpiar la tabla de jugadores solo si hay registros
        const jugExistentes = await Jugadores.findAll();
        if (jugExistentes.length > 0) {
            await Jugadores.destroy({ where: {} });
        }

        // Crear un JUGADOR inicial solo si la tabla está vacía
        const datosJugadorNuevo = {
            jugador_id : 0,
            nombre: 'Nuevo r',
            fechaNacimiento: '1990-01-20',
            lugarNacimiento: 'Ciudad',
            edad: 10,
            equipo_id: 1
        };

        const jugCreado = await Jugadores.create(datosJugadorNuevo);

        // Volver a activar restricciones de clave externa
        await sequelize.query('PRAGMA foreign_keys = ON');

        console.log('Tabla de jugadores inicializada correctamente.');
    } catch (error) {
        console.error('Error en beforeEach:', error);
    }
});


describe('POST /jugadores', function() {

    // Test para verificar la creación de un nuevo jugador
    it('debería crear un nuevo jugador', async function() {
        // Datos del nuevo jugador
        const datosJugador = {
            nombre: 'Nuevo Jugador',
            fechaNacimiento: '1990-01-01',
            lugarNacimiento: 'Ciudad Nueva',
            edad: 30,
            equipo_id: 1
        };

        // Realizar la solicitud POST al endpoint /jugadores
        const response = await request(app)
            .post('/jugadores')
            .send(datosJugador);

        // estado de la respuesta
        expect(response.status).to.equal(201);


        // Verificar que la respuesta contenga el nuevo jugador creado
        expect(response.body).to.include({
            nombre: datosJugador.nombre,
            lugarNacimiento: datosJugador.lugarNacimiento,
            edad: datosJugador.edad,
            equipo_id: datosJugador.equipo_id
        });


        // Verificar que el nuevo jugador está en la base de datos
        const jugador = await Jugadores.findOne({where: {nombre : datosJugador.nombre}});
        expect(jugador.fechaNacimiento).to.equal(datosJugador.fechaNacimiento);
        expect(jugador.lugarNacimiento).to.equal(datosJugador.lugarNacimiento);
        expect(jugador.edad).to.equal(datosJugador.edad);
        expect(jugador.equipo_id).to.equal(datosJugador.equipo_id);
    });
});


describe('GET /jugadores', function() {

    // TEST
    it('deberia devolver todos los jugadores', async function() {
        await request(app)
        .get("/jugadores")
        .expect(async (res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.lengthOf(1)
        })
    })

})

describe('GET /jugadores/:id', function() {

    // TEST
    it('debería devolver el jugador que coincida con el id', async function() {
        const id = 0;  //cambiamos el id segun nosotros necesitemos
        const response = await request(app)
            .get(`/jugadores/${id}`)
            .expect(200);

        expect(response.body).to.be.an('object');
        expect(response.body.jugador_id).to.equal(id);
    });
});

describe('PUT /jugadores/:id', function() {

    // TEST
    it('debería actualizar el jugador con un id determinado...', async function() {
        const id = 0;  //cambiamos el id segun nosotros necesitemos
        const datosNuevos = {
            nombre: "Jugador Actualizado",
            fechaNacimiento: "1990-01-01",
            lugarNacimiento: "Ciudad Actualizada",
            edad: 31,
            equipo_id: 2
        }
        const response = await request(app)
            .put(`/jugadores/${id}`)
            .send(datosNuevos)
            .expect(202)
 
        // Ahora verificamos que el jugador haya sido actualizado correctamente
        const jugadorEncontrado = await Jugadores.findByPk(0)
        expect(jugadorEncontrado.nombre).to.equal(datosNuevos.nombre);
        expect(jugadorEncontrado.fechaNacimiento).to.equal(datosNuevos.fechaNacimiento);
        expect(jugadorEncontrado.lugarNacimiento).to.equal(datosNuevos.lugarNacimiento);
        expect(jugadorEncontrado.edad).to.equal(datosNuevos.edad);
        expect(jugadorEncontrado.equipo_id).to.equal(datosNuevos.equipo_id);
        
    });
});


describe("DELETE /jugadores/:id", function() {

    //TEST
    it('debería borrar un jugador con un id determinado...', async function() {
        const id = 0;
        const response = await request(app)
            .delete(`/jugadores/${id}`) 
            .expect(200);

        // Verificar que se haya cambiado el atributo eliminado de jugador
        const jugadorEliminado = await Jugadores.findByPk(id);
        expect(jugadorEliminado.eliminado).to.equal(true); // Esperamos que no se encuentre el jugador en la base de datos
    });
});