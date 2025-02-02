const request = require("supertest")
const {expect} = require("chai")
const {app, sequelize, Reserva} = require("../app")

//Sincronizar la base de datos
beforeAll(async function() {
    await sequelize.sync({force: true})
})

//Limpiar tabla de reservas antes de cada prueba
beforeEach(async function() {
    try {
        //Desactivar restricciones de clave externa
        await sequelize.query("PRAGMA foreign_keys = OFF")

        //Limpiar tabla solo si hay registros
        const reservasExistentes = await Reserva.findAll()
        if (reservasExistentes.length > 0) {
            await Reserva.destroy({where: {}})
        }

        //Crear una reserva incial con tabla vacia
        const datos = {
            reserva_id: 0,
            hora: "15:30:00",                       // "HH:MM:SS"
            fechaReserva: "2024-06-22",              // "AAAA-MM-DD"
            estadio_id: 1
        }
        await Reserva.create(datos)

        //Volver a activar restricciones de clave externa
        await sequelize.query("PRAGMA foreign_keys = ON")
        console.log("Tabla de reservas inicializada correctamente")

    } catch (error) {
        console.error("Error en beforeEach: ", error)
    }
})


//Verificar obtencion de reservas (se espera una unica)
describe("GET /reservas", function() {
    it("Deberia devolver todas las reservas", async function() {
        await request(app)
            .get("/reservas")
            .expect(200)
            .expect(res => {
                expect(res.body).to.have.lengthOf(1)
            })
    })
})

//Verificar obtencion de reserva mediante id
describe("GET /reservas/:id", function() {
    it("Deberia devolver la reserva con id 0", async function() {
        const response = await request(app)
            .get("/reservas/0")
            .expect(200)
        
        expect(response.body).to.be.an("object")
        expect(response.body.reserva_id).to.equal(0)
    })
})

//Verificar creacion de una nueva reserva
describe("POST /reservas", function() {
    it("Deberia crear una nueva reserva", async function() {
        const nuevaReserva = {
            hora: "20:30:00",
            fechaReserva: "2024-06-22",
            estadio_id: 1
        }

        //Solicitud POST al endpoint /reservas
        const response = await request(app)
            .post("/reservas")
            .send(nuevaReserva)

        //Verificar estado de respuesta
        expect(response.status).to.equal(201)

        //Verificar body de respuesta
        expect(response.body).to.include({
            hora: nuevaReserva.hora,
            fechaReserva: nuevaReserva.fechaReserva,
            estadio_id: nuevaReserva.estadio_id
        })

        //Obtener id de reserva creada
        const id = response.body.reserva_id
        expect(id).to.exist

        //Verificar si la reserva se cargo en la BD correctamente
        const reservaBD = await Reserva.findOne({where: {reserva_id: id}})
        expect(reservaBD.hora).to.equal(nuevaReserva.hora)
        expect(reservaBD.fechaReserva).to.equal(nuevaReserva.fechaReserva)
        expect(reservaBD.estadio_id).to.equal(nuevaReserva.estadio_id)
    })
})

//Verificar modificacion de reserva mediante id
describe("PUT /reservas/:id", function() {
    it("Deberia modificar informacion de reserva con id 0", async function() {
        const nuevosDatos = {
            hora: "01:30:00",
            fechaReserva: "2024-06-23",
            estadio_id: 2
        }

        await request(app)
            .put("/reservas/0")
            .send(nuevosDatos)
            .expect(202)
        
        //Verificar actualizacion de reserva
        const reserva = await Reserva.findByPk(0)
        expect(reserva.hora).to.equal(nuevosDatos.hora)
        expect(reserva.fechaReserva).to.equal(nuevosDatos.fechaReserva)
        expect(reserva.estadio_id).to.equal(nuevosDatos.estadio_id)
    })
})

//Verificar eliminacion de reserva con id
describe("DELETE /reservas/:id", function() {
    it("Deberia borrar reserva con id 0", async function() {
        await request(app)
            .delete("/reservas/0")
            .expect(200)

        //Verificar eliminacion de reserva
        const reserva = await Reserva.findByPk(0)
        expect(reserva.eliminado).to.equal(true)
    })
})




