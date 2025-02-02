const request = require('supertest');
const { expect } = require('chai');
const { app, sequelize, Estadisticas} = require('../app');
const { Op } = require("sequelize")

beforeAll(async function() {
    await sequelize.sync({ force: true });
});

// Limpiar la tabla de estadísticas antes de cada prueba y agrega uno de pruebas
beforeEach(async function() {
    try {
        await sequelize.query('PRAGMA foreign_keys = OFF');
        await Estadisticas.destroy({ where: {} });
        
        const datosEstadisticaNueva = {estadistica_id: 0, cant_goles: 5, cant_asistencias: 2, jugador_id: 3, partido_id: 2};
        await Estadisticas.create(datosEstadisticaNueva);

        await sequelize.query('PRAGMA foreign_keys = ON');

        const estadisticasInsertadas = await Estadisticas.findAll();
        console.log('Estadísticas insertadas:', estadisticasInsertadas);

        
        console.log('Tabla de partidos inicializada correctamente.');
    } catch (error) {
        console.error('Error en beforeEach:', error);
    }
});

describe('POST /estadisticas', function() {
    it('Debe registrar una nueva estadistica', async function() {
        // Datos de la nueva estadística a guardar
        const datosEstadistica = {cant_goles: 1, cant_asistencias: 2, jugador_id: 1, partido_id: 5};

        // Realizar la solicitud POST al endpoint /estadisticas
        const response = await request(app)
            .post('/estadisticas')
            .send(datosEstadistica);

        // estado de la respuesta
        expect(response.status).to.equal(201);

        // Verificar que la respuesta contenga la estadistica creada
        expect(response.body).to.include({
            cant_goles: datosEstadistica.cant_goles, 
            cant_asistencias: datosEstadistica.cant_asistencias, 
            jugador_id: datosEstadistica.jugador_id, 
            partido_id: datosEstadistica.partido_id
        });

        // Verificar que el nuevo partido se registró y está en la base de datos
        const estadistica = await Estadisticas.findOne({
            where: {
                cant_goles: datosEstadistica.cant_goles, 
                cant_asistencias: datosEstadistica.cant_asistencias, 
                jugador_id: datosEstadistica.jugador_id,
                partido_id: datosEstadistica.partido_id
            }});
        expect(estadistica.cant_goles).to.equal(datosEstadistica.cant_goles);
        expect(estadistica.cant_asistencias).to.equal(datosEstadistica.cant_asistencias);
        expect(estadistica.jugador_id).to.equal(datosEstadistica.jugador_id);
        expect(estadistica.partido_id).to.equal(datosEstadistica.partido_id);
    });
});

describe('GET /estadisticas', function() {
    
    // TEST
    it('Debe devolver todas las estadísticas registradas', async function(){
        
        await request(app)
        .get("/estadisticas")
        .expect(200)
        .then((res) => {
            expect(res.body).to.have.lengthOf(1);
        });
    });
});

describe('GET /estadisticas/:id', function() {
    // TEST
    it('Debe devolver la estadística que coincida con el id', async function() {
        const id = 0;
        await request(app)
            .get("/estadisticas/" + id)
            .expect((res) => {
                expect(res.statusCode).to.equal(201)
                expect(res.body).to.be.an('object')
                expect(res.body.estadistica_id).to.equal(id)
            })
    });
});


describe('PUT /estadisticas/:id', function() {

    // TEST
    it('Debe actualizar la estadistica con un id determinado...', async function() {
        const id = 0;
        const datosEstadisticaActualizar = { cant_goles: 4, cant_asistencias: 3, jugador_id: 1, partido_id: 5 };
        
        const response = await request(app)
            .put(`/estadisticas/${id}`)
            .send(datosEstadisticaActualizar)
            .expect(202)
 
        // Ahora verificamos que la estadistica haya sido actualizada correctamente
        const estadisticaEncontrada = await Estadisticas.findByPk(0)
        expect(estadisticaEncontrada.cant_goles).to.equal(datosEstadisticaActualizar.cant_goles);
        expect(estadisticaEncontrada.cant_asistencias).to.equal(datosEstadisticaActualizar.cant_asistencias);
        expect(estadisticaEncontrada.jugador_id).to.equal(datosEstadisticaActualizar.jugador_id);
        expect(estadisticaEncontrada.partido_id).to.equal(datosEstadisticaActualizar.partido_id)
    });
});

describe("DELETE /estadisticas/:id", function() {

    //TEST
    it('Debe borrar una estadistica con un id determinado...', async function() {
        const id = 0;
        const response = await request(app)
            .delete(`/estadisticas/${id}`) 
            .expect(200);

        // Verificar que se haya cambiado el atributo eliminado
        const estadisticaEliminada = await Estadisticas.findByPk(id);
        expect(estadisticaEliminada.eliminado).to.equal(true);
    });
});