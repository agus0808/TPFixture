const request = require("supertest")
const {expect} = require("chai")
const {app, sequelize, Estadio} = require("../app")

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
        const estadiosExistentes = await Estadio.findAll()
        if (estadiosExistentes.length > 0) {
            await Estadio.destroy({where: {}})
        }

        //Crear un estadio incial con tabla vacia
        const datos = {
            estadio_id: 0,
            nombre: "Estadio prueba",   
            capacidad: 300,             
            fechaConstruccion: "2024-06-22",              // "AAAA-MM-DD"
            equipo_id: 1
        }
        await Estadio.create(datos)

        //Volver a activar restricciones de clave externa
        await sequelize.query("PRAGMA foreign_keys = ON")
        console.log("Tabla de estadios inicializada correctamente")

    } catch (error) {
        console.error("Error en beforeEach: ", error)
    }
})


//Verificacion obtencion de estadio mediante id
describe("GET /estadios/:id", function() {
    it("Deberia devolver estadio con id 0", async function() {
        const response = await request(app)
            .get("/estadios/0")
            .expect(200)

        expect(response.body).to.be.an("object")
        expect(response.body.estadio_id).to.equal(0)
    })
})

//Verificar obtencion de estadios (unicamente el creado por la prueba...)
describe("GET /estadios", function() {
    it("Deberia devolver todos los estadios", async function() {
        await request(app)
            .get("/estadios")
            .expect(200)
            .expect(res => {
                expect(res.body).to.have.lengthOf(1)
            })
    })
})

//Verificar creacion de un nuevo estadio
describe("POST /estadios", function() {
    it("Deberia crear un nuevo estadio", async function() {
        const nuevoEstadio = {
            nombre: "Nuevo estadio",
            capacidad: 150,
            fechaConstruccion: "2000-05-05",
            equipo_id: 2
        }

        const response = await request(app)
            .post("/estadios")
            .send(nuevoEstadio)

        //Verificar estado de respuesta
        expect(response.status).to.equal(201)

        //Verificar body de respuesta
        expect(response.body).to.include({
            nombre: nuevoEstadio.nombre,
            capacidad: nuevoEstadio.capacidad,
            fechaConstruccion: nuevoEstadio.fechaConstruccion,
            equipo_id: nuevoEstadio.equipo_id
        })

        //Obtener id de estadio creado
        const id = response.body.estadio_id
        expect(id).to.exist

        //Verificar carga de estadio en BD
        const estadioBD = await Estadio.findOne({where: {estadio_id: id}})
        expect(estadioBD.nombre).to.equal(nuevoEstadio.nombre)
        expect(estadioBD.capacidad).to.equal(nuevoEstadio.capacidad)
        expect(estadioBD.fechaConstruccion).to.equal(nuevoEstadio.fechaConstruccion)
        expect(estadioBD.equipo_id).to.equal(nuevoEstadio.equipo_id)
    })
})

//Verificar modificacion de estadio mediante id
describe("PUT /reservas/:id", function() {
    it("Deberia modificar informacion de estadio con id 0", async function() {
        const nuevosDatos = {
            nombre: "Estadio modificado",
            capacidad: 200,
            fechaConstruccion: "2024-06-23",
            equipo_id: 2
        }

        await request(app)
            .put("/estadios/0")
            .send(nuevosDatos)
            .expect(202)

        //Verificar actualizacion de estadio
        const estadio = await Estadio.findByPk(0)
        expect(estadio.nombre).to.equal(nuevosDatos.nombre)
        expect(estadio.capacidad).to.equal(nuevosDatos.capacidad)
        expect(estadio.fechaConstruccion).to.equal(nuevosDatos.fechaConstruccion)
        expect(estadio.equipo_id).to.equal(nuevosDatos.equipo_id)
    })
})

//Verificar eliminacion de estadio con id
describe("DELETE /estadios/:id", function() {
    it("Deberia borrar estadio con id 0", async function() {
        await request(app)
            .delete("/estadios/0")
            .expect(200)
        
        //Verificar eliminacion de estadio
        const estadio = await Estadio.findByPk(0)
        expect(estadio.eliminado).to.equal(true)
    })
})
