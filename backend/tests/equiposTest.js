const request = require('supertest');
const { expect } = require('chai');
const { app, sequelize, Equipos, Entrenador, Estadisticas, Jugadores, Partidos, Reserva, SesionEntrenamiento, Estadio } = require('../app');


// Sincronizar la base de datos 
beforeAll(async function() {
    await sequelize.sync({ force: true });
});

// Limpiar la tabla de equipo antes de cada prueba
beforeEach(async function() {
    try {
        // Desactivar restricciones de clave externa
        await sequelize.query('PRAGMA foreign_keys = OFF');

        // Limpiar la tabla de equipos solo si hay registros
        const equiposExistentes = await Equipos.findAll();
        if (equiposExistentes.length > 0) {
            await Equipos.destroy({ where: {} });
            await Estadio.destroy({ where: {} });
            await SesionEntrenamiento.destroy({ where: {} });
            await Reserva.destroy({ where: {} });
            await Estadisticas.destroy({ where: {} });
            await Jugadores.destroy({ where: {} });
            await Partidos.destroy({ where: {} });
            await Entrenador.destroy({ where: {} });
        }

        // Crear un equipo inicial solo si la tabla está vacía
        const equipoInicial = {
            equipo_id: 0,
            nombre: 'Equipo de prueba',
            ciudad: "Buenos Aires",
            fechaFundacion: '1918-08-01'
        };

        const equipoCreado = await Equipos.create(equipoInicial);

        // Volver a activar restricciones de clave externa
        await sequelize.query('PRAGMA foreign_keys = ON');

        console.log('Tabla de equipos inicializada correctamente.');
    } catch (error) {
        console.error('Error en beforeEach:', error);
    }
});

describe('POST /equipos', function() {

    // TEST
    it('debería crear un nuevo equipo...', async function() {
        // Datos del nuevo equipo
        const datosEquipo = {
            nombre: 'Holaaa',
            ciudad: 'Cordoba',
            fechaFundacion: '1918-08-08',
        };

        // Realizar la solicitud POST al endpoint /jugadores
        const response = await request(app)
            .post('/equipos')
            .send(datosEquipo);

        // estado de la respuesta
        expect(response.status).to.equal(201); // Este estado lo defini en el endpoint correspondiente


        // Verificar que la respuesta contenga el nuevo jugador creado
        expect(response.body).to.include({
            nombre: datosEquipo.nombre,
            ciudad: datosEquipo.ciudad,
            fechaFundacion: datosEquipo.fechaFundacion
        });

        // Verificar que el nuevo jugador está en la base de datos
        const equipo = await Equipos.findOne({where: {nombre:datosEquipo.nombre}});
        expect(equipo.nombre).to.equal(datosEquipo.nombre);
        expect(equipo.ciudad).to.equal(datosEquipo.ciudad);
        expect(equipo.fechaFundacion).to.equal(datosEquipo.fechaFundacion);

    });
});

describe('GET /equipos', function() {

    // TEST
    it('deberia devolver todos los equipos', async function() {
        await request(app)
        .get("/equipos") 
        .expect(async (res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.have.lengthOf(1)
        })

        })
        
    })



describe('GET /equipos/:id', function() {
        // TEST
        it('debería devolver el equipo que coincida con el id', async function() {
            const id = 0
            const response = await request(app)
                .get(`/equipos/${id}`)
                .expect(201);
    
            expect(response.body).to.be.an('object');
            expect(response.body.equipo_id).to.equal(id);
            expect(response.body.nombre).to.equal('Equipo de prueba');
            expect(response.body.ciudad).to.equal('Buenos Aires');
            expect(response.body.fechaFundacion).to.equal('1918-08-01')
        });
    });

describe('PUT /equipos/:id', function() {

    // TEST
    it('debería actualizar el equipo con un id determinado...', async function() {
        const id = 0;  //cambiamos el id segun nosotros necesitemos
        const datosNuevos = {
            nombre: "Equipo Actualizado",
            ciudad: "Ciudad nueva",
            fechaFundacion: "1900-08-01"
        }
        const response = await request(app)
            .put(`/equipos/${id}`)
            .send(datosNuevos)
            .expect(202)

        // Ahora verificamos que el equipo haya sido actualizado correctamente
        const equipoActualizado = await Equipos.findByPk(0);
        expect(equipoActualizado.nombre).to.equal(datosNuevos.nombre);
        expect(equipoActualizado.ciudad).to.equal(datosNuevos.ciudad);
        expect(equipoActualizado.fechaFundacion).to.equal(datosNuevos.fechaFundacion);
        
    });
});


describe("DELETE /equipos/:id", function() {

    //TEST
    it('debería borrar un equipo con un id determinado...', async function() {
        const id = 0;
        const response = await request(app)
            .delete(`/equipos/${id}`) 
            .expect(200);

        // Verificar que se haya cambiado el atributo eliminado del jugador
        const equipoEliminado = await Equipos.findByPk(id);
        expect(equipoEliminado.eliminado).to.equal(true); 
    });
});