const request = require("supertest")
const {expect} = require("chai")
const {app, sequelize, Entrenador} = require("../app")

//Sincronizar la base de datos 
beforeAll(async function(){
    await sequelize.sync({force: true})
})

//Limpiar la tabla de entrenadores antes de cada prueba
beforeEach(async function(){
    try {
        //Desactivar restricciones de clave externa 
        await sequelize.query("PRAGMA foreign_keys = OFF")

        //Limpiar la tabla de entrenadores solo si hay registros 
        const entrenadoresExistentes = await Entrenador.findAll()
        if (entrenadoresExistentes.length > 0){
            await Entrenador.destroy({where: {}})
        }
        
        //Crear un Entrenador inicial solo si la tabla está vacía
        const datosEntrenadorNuevo = {
            entrenador_id: 0,
            nombre: "Entrenador 0",
            experiencia: "Mala",
            fechaNacimiento: "1977-08-06",
            equipo_id: 5
        }
        const EntrenadorCreado = await Entrenador.create(datosEntrenadorNuevo)

        //Volver a activar restricciones de clave externa 
        await sequelize.query("PRAGMA foreign_keys = ON")
        console.log("Tabla de entrenadores inicializada correctamente")
    } catch (error){
        console.error("Error en beforeEach:", error)
    }
    
})



describe("POST /entrenadores", function(){
    //Test para verificar la creación de un nuevo entrenador
    it("debería crear un nuevo entrenador", async function(){
        //Datos del nuevo entrenador
        const datosEntrenador = {
            nombre: "Entrenador nuevo",
            experiencia: "Buena",
            fechaNacimiento: "1978-05-22",
            equipo_id: 1
        }
        //Realizar la solicitud Post an endpoint /entrenadores
        const response = await request(app)
        .post("/entrenadores")
        .send(datosEntrenador)

        //estado de la respuesta
        expect(response.status).to.equal(201)

        //verificar que la respuesta contenga el nuevo entrenador creado
        expect(response.body).to.include({
            nombre: datosEntrenador.nombre,
            experiencia: datosEntrenador.experiencia,
            fechaNacimiento: datosEntrenador.fechaNacimiento,
            equipo_id: datosEntrenador.equipo_id
        })

        //Verificar que el nuevo entrenador este en la base de datos 
        const entrenador = await Entrenador.findOne({where: {nombre: datosEntrenador.nombre}})
        expect(entrenador.experiencia).to.equal(datosEntrenador.experiencia)
        expect(entrenador.fechaNacimiento).to.equal(datosEntrenador.fechaNacimiento)
        expect(entrenador.equipo_id).to.equal(datosEntrenador.equipo_id)
    })
})


describe("GET /entrenadores", function(){
    //Test
    it("debería devolver todos los entrenadores", async function(){
        await request(app)
        .get("/entrenadores")
        .expect(async (res) => {
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.have.lengthOf(1)
        })
    })
})

describe("GET /entrenadores/:id", function(){
    //Test
    it("debería devolver el entrenador que coincida con el id", async function(){
        const id = 0 //cambiamos el id según lo que nosotros necesitamos
        const respose = await request(app)
        .get(`/entrenadores/${id}`)
        .expect(200)
        
        expect(respose.body).to.be.an("object")
        expect(respose.body.entrenador_id).to.equal(id)
    })
})

describe("PUT /entrenadores/:id", function(){
    //Test
    it("Debería actualizar al entrenador con un id determinado", async function(){
        const id = 0 //cambiamos el id según lo que nosotros necesitamos
        const datosNuevos = {
            nombre: "Entrenador actualizado",
            experiencia: "Experiencia actualizada",
            fechaNacimiento: "1978-05-22",
            equipo_id: 2
        } 

        const response = await request(app)
        .put(`/entrenadores/${id}`)
        .send(datosNuevos)
        .expect(202)

        //Verificar que el entrenador se haya actualizado correctamente 
        const entrenadorEncontrado = await Entrenador.findByPk(0)
        expect(entrenadorEncontrado.nombre).to.equal(datosNuevos.nombre)
        expect(entrenadorEncontrado.experiencia).to.equal(datosNuevos.experiencia)
        expect(entrenadorEncontrado.fechaNacimiento).to.equal(datosNuevos.fechaNacimiento)
        expect(entrenadorEncontrado.equipo_id).to.equal(datosNuevos.equipo_id)

    })
})


describe("DELETE /entrenadores/:id", function(){
    //Test
    it("Debería borrar un entrenador con un id determinado", async function(){
        const id = 0
        const response = await request(app)
        .delete(`/entrenadores/${id}`)
        .expect(200)

        //Verificar que se haya eliminado el entrenador
        const entrenadorEliminado = await Entrenador.findByPk(id)
        expect(entrenadorEliminado.eliminado).to.equal(true)
    })
})
