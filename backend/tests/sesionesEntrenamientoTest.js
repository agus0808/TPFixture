const request = require('supertest');
const { expect } = require('chai');
const { app, sequelize, SesionEntrenamiento } = require('../app');
const { Entrenador } = require('../tablas/entrenador');
const {Op} = require("sequelize")

//Sincronizar la base de datos
beforeAll(async function(){
    await sequelize.sync({force: true})
})

//Limpiar la tabla de sesiones de entrenamiento antes de cada prueba
beforeEach(async function(){
    try {
        //Desactivar restricciones de clave externa
        await sequelize.query('PRAGMA foreign_keys = OFF');

        //Limpiar la tabla de sesiones solo si hay registros 
        const sesionesExistentes = await SesionEntrenamiento.findAll()
        if (sesionesExistentes.length > 0){
            await SesionEntrenamiento.destroy({where: {}})
        }
        
        //Crear una sesión inicial solo si la tabla está vacía 
        const datosSesionNueva = {
            sesionEntrenamiento_id: 0,
            fecha: "2024-06-21",
            duracion: 90,
            entrenador_id: 1
        }
        
        const sesionCreada = await SesionEntrenamiento.create(datosSesionNueva)

        //Volver a activar restricciones de clave externa
        await sequelize.query('PRAGMA foreign_keys = ON');
        
        console.log("Tabla de sesiones de entrenamiento inicializada correctamente")
    } catch(error) {
        console.error("Error en deforeEach:", error)
    }
    
})

describe("POST /sesiones-entrenamiento", function(){
    //Test para verificar la creación de una nueva sesión de entrenamiento
    it("Debería crear una nueva sesión de entrenamiento", async function(){
        const datosSesion = {
        fecha: "2023-05-22",
        duracion: 80,
        entrenador_id: 1
        }

        //Realizar la solicitud POST al endpoint /sesiones-entrenamiento
        const response = await request(app)
        .post("/sesiones-entrenamiento")
        .send(datosSesion)

        //estado de la respuesta
        expect(response.status).to.equal(201)

        //Verificar que la respuesta contenga la nueva sesión creada
        expect(response.body).to.include({
            fecha: datosSesion.fecha,
            duracion: datosSesion.duracion,
            entrenador_id: datosSesion.entrenador_id
        })

        //Obtener sesionEntrenamiento_id
        const sesion_id = response.body.sesionEntrenamiento_id
        expect(sesion_id).to.exist
        
        //Verificar que la nueva sesión de entrenamiento está en la base 
        const sesionEntrenamiento = await SesionEntrenamiento.findOne({where: {sesionEntrenamiento_id: sesion_id}})
        expect(sesionEntrenamiento.fecha).to.equal(datosSesion.fecha)
        expect(sesionEntrenamiento.duracion).to.equal(datosSesion.duracion)
        expect(sesionEntrenamiento.entrenador_id).to.equal(datosSesion.entrenador_id)
    })
})

describe("GET /sesiones-entrenamiento", function(){
    //Test
    it("Debería devolver todos los equipos", async function(){
        await request(app)
        .get("/sesiones-entrenamiento")
        .expect(async (res) =>{
            expect(res.statusCode).to.equal(200)
            expect(res.body).to.have.lengthOf(1)
        })
    })
})

describe("GET /sesiones-entrenamiento/:id", function(){
    //Test
    it("Debería devolver el equipo que coincida con el id", async function(){
        const id = 0
        const response = await request(app)
            .get(`/sesiones-entrenamiento/${id}`)
            .expect(201)
        
        expect(response.body).to.be.an("object")
        expect(response.body.sesionEntrenamiento_id).to.equal(id)
        expect(response.body.fecha).to.equal("2024-06-21")
        expect(response.body.duracion).to.equal(90)
        expect(response.body.entrenador_id).to.equal(1)
        
    })
})

describe("PUT /sesiones-entrenamiento/:id", function(){
    //Test
    it("Debería actualizar la sesión de entrenamiento con un id determinado", async function(){
        const id = 0 //cambiamos el id según lo que nosotros necesitamos
        const datosNuevos = {
            fecha: "2024-06-21",
            duracion: 70,
            entrenador_id: 3
        }
        const response = await request(app)
            .put(`/sesiones-entrenamiento/${id}`)
            .send(datosNuevos)
            .expect(202)

        //Verificar que la sesión de entrenamiento haya sido actualizada correctamente
        const sesionActualizada = await SesionEntrenamiento.findByPk(0)
        expect(sesionActualizada.fecha).to.equal(datosNuevos.fecha)
        expect(sesionActualizada.duracion).to.equal(datosNuevos.duracion)
        expect(sesionActualizada.entrenador_id).to.equal(datosNuevos.entrenador_id)
    })
})

describe("DELETE /sesiones-entrenamiento/:id", function(){
    it("Debería borrar una sesión de entrenamiento con un id determinado", async function(){
        //Test
        const id = 0
        const response = await request(app)
            .delete(`/sesiones-entrenamiento/${id}`)
            .expect(200)

        //Verificar que se haya eliminado la sesión de entrenamiento
        const sesionEliminada = await SesionEntrenamiento.findByPk(id)
        expect(sesionEliminada.eliminado).to.equal(true)
    })
    
    
})