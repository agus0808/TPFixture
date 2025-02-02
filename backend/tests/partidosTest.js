const request = require('supertest');
const { expect } = require('chai');
const { app, sequelize, Partidos} = require('../app');
const { Op } = require("sequelize")

beforeAll(async function() {
    await sequelize.sync({ force: true });
});

// Limpiar la tabla de partidos antes de cada prueba y agregar uno de pruebas
beforeEach(async function() {
    try {
        await sequelize.query('PRAGMA foreign_keys = OFF');

        const partidosExistentes = await Partidos.findAll();
        if (partidosExistentes.length > 0) {
            await Partidos.destroy({ where: {} });
        }
        const datosPartidoNuevo = { partido_id: 0, fecha: '1990-01-20', resultado: '2-1', equipo_local: 1, equipo_visitante: 3};
        const partidoCreado = await Partidos.create(datosPartidoNuevo);

        await sequelize.query('PRAGMA foreign_keys = ON');
        console.log('Tabla de partidos inicializada correctamente.');
    } catch (error) {
        console.error('Error en beforeEach:', error);
    }
});

describe('POST /partidos', function() {
    it('Debe registrar un nuevo partido', async function() {
        // Datos del nuevo partido a guardar
        const datosPartido = {
            fecha: '2004-12-25',
            resultado: '8-3',
            equipo_local: 4,
            equipo_visitante: 1
        };

        // Realizar la solicitud POST al endpoint /partidos
        const response = await request(app)
            .post('/partidos')
            .send(datosPartido);

        // estado de la respuesta
        expect(response.status).to.equal(201);

        //const fechaRecibida = new Date(response.body.fecha).toISOString().split('T')[0];
        //expect(fechaRecibida).to.equal(datosPartido.fecha);

        // Verificar que la respuesta contenga el partido creado
        expect(response.body).to.include({
            fecha: datosPartido.fecha,
            resultado: datosPartido.resultado,
            equipo_local: datosPartido.equipo_local,
            equipo_visitante: datosPartido.equipo_visitante
        });

        // Verificar que el nuevo partido se registró y está en la base de datos
        const partido = await Partidos.findOne({where: {fecha: {[Op.like]: "%" + datosPartido.fecha + "%"}}});
        expect(partido.resultado).to.equal(datosPartido.resultado);
        expect(partido.equipo_local).to.equal(datosPartido.equipo_local);
        expect(partido.equipo_visitante).to.equal(datosPartido.equipo_visitante);
    });
});

describe('GET /partidos', function() {
    // TEST
    it('Debe devolver todos los partidos registrados', async function(){
        await request(app)
        .get("/partidos")
        .expect((res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.lengthOf(1);
        });
    });
});

describe('GET /partidos/:id', function() {
    // TEST
    it('Debe devolver el partido que coincida con el id', async function() {
        const id = 0;
        await request(app)
            .get("/partidos/" + id)
            .expect((res) => {
                expect(res.statusCode).to.equal(201)
                expect(res.body).to.be.an('object')
                expect(res.body.partido_id).to.equal(id)
                expect(res.body.fecha).to.equal('1990-01-20')
                expect(res.body.resultado).to.equal('2-1')
                expect(res.body.equipo_local).to.equal(1)
                expect(res.body.equipo_visitante).to.equal(3)
            })
    });
});

describe('PUT /partidos/:id', function() {

    // TEST
    it('Debe actualizar el partido con un id determinado...', async function() {
        const id = 0;
        const datosPartidoActualizar = { partido_id: 0, fecha: '1300-01-20', resultado: '2-4', equipo_local: 4, equipo_visitante: 1};
        
        const response = await request(app)
            .put(`/partidos/${id}`)
            .send(datosPartidoActualizar)
            .expect(202)
 
        // Ahora verificamos que el partido haya sido actualizado correctamente
        const partidoEncontrado = await Partidos.findByPk(0)
        expect(partidoEncontrado.resultado).to.equal(datosPartidoActualizar.resultado);
        expect(partidoEncontrado.fecha).to.equal(datosPartidoActualizar.fecha);
        expect(partidoEncontrado.equipo_local).to.equal(datosPartidoActualizar.equipo_local);
        expect(partidoEncontrado.equipo_visitante).to.equal(datosPartidoActualizar.equipo_visitante);
    });
});

describe("DELETE /partidos/:id", function() {

    //TEST
    it('Debe borrar un partido con un id determinado...', async function() {
        const id = 0;
        const response = await request(app)
            .delete(`/partidos/${id}`) 
            .expect(200);

        // Verificar que se haya cambiado el atributo eliminado
        const partidoEliminado = await Partidos.findByPk(id);
        expect(partidoEliminado.eliminado).to.equal(true);
    });
});