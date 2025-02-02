const express = require("express");
const cors = require("cors")
const {sequelize} = require("./data/dbInit")

const {Equipos, Jugadores, Estadisticas, Partidos, Estadio, Reserva} = require("./tablas/relaciones")

const funcionesEquipo = require("./services/equipoServices")
const funcionesJugador = require("./services/jugadorServices")
const funcionesPartido = require("./services/partidoServices");
const funcionesEstadistica = require("./services/estadisticaServices");
const funcionesEstadio = require("./services/estadioService")
const funcionesReserva = require("./services/reservaServices")


const corsOptions = {
    origin: '*', 
    optionsSuccessStatus: 200 
};


const app = express();
app.use(express.json());
app.use(cors(corsOptions));


// Para EQUIPOS
app.get("/equipos", async (req, res) => {

    const todosEquipos = await funcionesEquipo.getAllEquipo(req.query)
    if (todosEquipos != undefined) {
        res.status(200).json(todosEquipos)
    } else {
        res.status(404).json("No se encontraron equipos")
    }
})

app.get("/equipos/:id", async (req, res) => {

    const id = req.params.id
    if (id != undefined && id != "") {
        const equipo = await funcionesEquipo.getByIdEquipo(id)
        res.status(201).json(equipo)
    } else {
        res.status(404).json("Id no encontrado")
    }
})

app.post("/equipos", async (req, res) => {

    const { nombre, ciudad, fechaFundacion } = req.body;
    const nuevoEquipo = await funcionesEquipo.postEquipo(nombre, ciudad, fechaFundacion)
    if (nuevoEquipo != undefined && nuevoEquipo != "") {
        res.status(201).json(nuevoEquipo)
    }  else {
        res.status(404).json("No se ha podido agregar un nuevo equipo")
    }
})


app.put("/equipos/:id", async (req, res) => {

    const id = req.params.id;
    const {nombre, ciudad, fechaFundacion} = req.body;
    const eqEncontrado = await funcionesEquipo.putEquipo(id, {nombre, ciudad, fechaFundacion});
    if (eqEncontrado != undefined && eqEncontrado != "") {
        res.status(202).json(eqEncontrado)
    }  else {
        res.status(404).json("No se ha podido actualizar el equipo")
    }

})

app.delete("/equipos/:id", async (req, res) => {

    id = req.params.id
    if (id != undefined && id != ""){
        const eliminado = await funcionesEquipo.deleteEquipo(id)
        res.status(200).json(eliminado)
    } else {
        res.status(404).json("Equipo no eliminado")
    }

})


// Para JUGADORES
app.get("/jugadores", async (req, res) => {

    const todosJugadores = await funcionesJugador.getAllJugador(req.query)
    if (todosJugadores != undefined) {
        res.status(200).json(todosJugadores)
    } else {
        res.status(404).json("No se encontraron jugadores")
    }
})

app.get("/jugadores/:id", async (req, res) => {

    const id = req.params.id
    if (id != undefined && id != "") {
        const jugador = await funcionesJugador.getByIdJugador(id)
        res.json(jugador)
    } else {
        res.status(404).json("Id no encontrado")
    }
})

app.post("/jugadores", async (req, res) => {
    const { nombre, fechaNacimiento, lugarNacimiento, edad, equipo_id } = req.body;
    const nuevoJugador = await funcionesJugador.postJugador(nombre, fechaNacimiento, lugarNacimiento, edad, equipo_id)
    if (nuevoJugador != undefined && nuevoJugador != "") {
        res.status(201).json(nuevoJugador)
    }  else {
        res.status(404).json("No se ha podido agregar un nuevo jugador")
    }
})


app.put("/jugadores/:id", async (req, res) => {
    const id = req.params.id
    const {nombre, fechaNacimiento, lugarNacimiento, edad, equipo_id} = req.body;
    const jugEncontrado = await funcionesJugador.putJugador(id, {nombre, fechaNacimiento, lugarNacimiento, edad, equipo_id})
    if (jugEncontrado != undefined && jugEncontrado != "") {
        res.status(202).json(jugEncontrado)
    }  else {
        res.status(404).json("No se ha podido actualizar el jugador")
    }

})

app.delete("/jugadores/:id", async (req, res) => {

    const id = req.params.id
    if (id != undefined && id != ""){
        const eliminado = await funcionesJugador.deleteJugador(id)
        res.status(200).json(eliminado)
    } else {
        res.status(404).json("Jugador no eliminado")
    }

})

// Para PARTIDOS
app.get("/partidos", async (req, res) => {
    const todosPartidos = await funcionesPartido.getAllPartidos(req.query)
    if (todosPartidos != undefined) {
        res.status(200).json(todosPartidos)
    } else {
        res.status(404).json("No se encontraron partidos registrados")
    }
})

app.get("/partidos/:id", async (req, res) => {
    const id = req.params.id
    if (id != undefined && id != "") {
        const partido = await funcionesPartido.getByIdPartido(id)
        if (partido != null) {
            res.status(201).json(partido)
        } else {
            res.status(404).json("No se encontró el partido registrado")
        }
    } else {
        res.status(404).json("Partido no encontrado")
    }
})

app.post("/partidos", async (req, res) => {
    const { fecha, resultado, equipo_local, equipo_visitante } = req.body;
    const nuevoPartido = await funcionesPartido.postPartido(fecha, resultado, equipo_local, equipo_visitante)
    if (nuevoPartido != undefined && nuevoPartido != "") {
        res.status(201).json(nuevoPartido)
    }  else {
        res.status(404).json("No se ha podido registrar un nuevo partido")
    }
})


app.put("/partidos/:id", async (req, res) => {
    const id = req.params.id;
    const {fecha, resultado, equipo_local, equipo_visitante} = req.body;
    const partEncontrado = await funcionesPartido.putPartido(id, {fecha, resultado, equipo_local, equipo_visitante})
    if (partEncontrado != undefined && partEncontrado != "") {
        res.status(202).json(partEncontrado)
    }  else {
        res.status(404).json("No se ha podido actualizar el partido")
    }
})

app.delete("/partidos/:id", async (req, res) => {

    id = req.params.id
    if (id != undefined && id != ""){
        const eliminado = await funcionesPartido.deletePartido(id)
        res.status(200).json(eliminado)
    } else {
        res.status(404).json("Error. Partido no eliminado")
    }
})

// Para ESTADISTICAS
app.get("/estadisticas", async (req, res) => {
    const todasEstadisticas = await funcionesEstadistica.getAllEstadisticas(req.query)
    if (todasEstadisticas != undefined) {
        res.status(200).json(todasEstadisticas)
    } else {
        res.status(404).json("No se encontraron estadísticas registradas")
    }
})

app.get("/estadisticas/:id", async (req, res) => {
    const id = req.params.id
    if (id != undefined && id != "") {
        const estadistica = await funcionesEstadistica.getByIdEstadistica(id)
        if (estadistica != null) {
            res.status(201).json(estadistica)
        } else {
            res.status(404).json("No se encontró la estadística registrada")
        }
    } else {
        res.status(404).json("Estadística no encontrada")
    }
})

app.post("/estadisticas", async (req, res) => {
    const { cant_goles, cant_asistencias, jugador_id, partido_id } = req.body;
    const nuevaEstadistica = await funcionesEstadistica.postEstadistica(cant_goles, cant_asistencias, jugador_id, partido_id)
    if (nuevaEstadistica != undefined && nuevaEstadistica != "") {
        res.status(201).json(nuevaEstadistica)
    }  else {
        res.status(404).json("No se ha podido registrar una nueva estadística")
    }
})


app.put("/estadisticas/:id", async (req, res) => {
    const id = req.params.id;
    const { cant_goles, cant_asistencias, jugador_id, partido_id } = req.body;
    const estEncontrada = await funcionesEstadistica.putEstadistica(id, {cant_goles, cant_asistencias, jugador_id, partido_id})
    if (estEncontrada != undefined && estEncontrada != "") {
        res.status(202).json(estEncontrada)
    }  else {
        res.status(404).json("No se ha podido actualizar la estadística")
    }
})

app.delete("/estadisticas/:id", async (req, res) => {
    id = req.params.id
    if (id != undefined && id != ""){
        const eliminado = await funcionesEstadistica.deleteEstadistica(id)
        res.status(200).json(eliminado)
    } else {
        res.status(404).json("Error. Estadística no eliminada")
    }
})

// Para Estadios
app.get("/estadios", async (req, res) => {

    // req.query esperado: nombre  -->   /estadios?nombre=
    const estadios = await funcionesEstadio.getAllEstadios(req.query)
    if (estadios) {
        res.status(200).json(estadios)
    } else {
        res.status(404).json("No se encontraron estadios")
    }
})

app.get("/estadios/:id", async (req, res) => {
    const id = req.params.id
    if (id != undefined && id != "") {
        const estadio = await funcionesEstadio.getByIdEstadio(id)
        res.status(200).json(estadio)
    } else {
        res.status(404).json("Id no encontrado")
    }
})

app.post("/estadios", async (req, res) => {
    const { nombre, capacidad, fechaConstruccion, equipo_id } = req.body;
    const nuevoEstadio = await funcionesEstadio.postEstadio(nombre, capacidad, fechaConstruccion, equipo_id)
    if (nuevoEstadio != undefined && nuevoEstadio != "") {
        res.status(201).json(nuevoEstadio)
    }  else {
        res.status(404).json("No se ha podido agregar un nuevo estadio")
    }
})


app.put("/estadios/:id", async (req, res) => {
    const id = req.params.id
    const { nombre, capacidad, fechaConstruccion, equipo_id } = req.body;
    const estadio = await funcionesEstadio.putEstadio(id, { nombre, capacidad, fechaConstruccion, equipo_id })
    if (estadio != null && estadio != "") {
        res.status(202).json(estadio)
    }  else {
        res.status(404).json("No se ha podido actualizar el estadio")
    }

})

app.delete("/estadios/:id", async (req, res) => {
    const id = req.params.id
    if (id != undefined && id != ""){
        const estadio = await funcionesEstadio.deleteEstadio(id)
        res.status(200).json(estadio)
    } else {
        res.status(404).json("Estadio no eliminado")
    }

})


// Para Reservas
app.get("/reservas", async (req, res) => {
    // req.query esperados: fechaDesde, fechaHasta  -->  /reservas?fechaDesde=AAAA-MM-DD&fechaHasta=
    const reservas = await funcionesReserva.getAllReservas(req.query)
    if (reservas) {
        res.status(200).json(reservas)
    } else {
        res.status(404).json("No se encontraron reservas")
    }
})

app.get("/reservas/:id", async (req, res) => {
    const id = req.params.id
    if (id != undefined && id != "") {
        const reserva = await funcionesReserva.getByIdReserva(id)
        res.status(200).json(reserva)
    } else {
        res.status(404).json("Id no encontrado")
    }
})

app.post("/reservas", async (req, res) => {
    const { hora, fechaReserva, estadio_id } = req.body;
    const nuevaReserva = await funcionesReserva.postReserva(hora, fechaReserva, estadio_id)
    if (nuevaReserva != undefined && nuevaReserva != "") {
        res.status(201).json(nuevaReserva)
    }  else {
        res.status(404).json("No se ha podido agregar una nueva reserva")
    }
})


app.put("/reservas/:id", async (req, res) => {
    const id = req.params.id
    const { hora, fechaReserva, estadio_id } = req.body;
    const reserva = await funcionesReserva.putReserva(id, { hora, fechaReserva, estadio_id })
    if (reserva != undefined && reserva != "") {
        res.status(202).json(reserva)
    }  else {
        res.status(404).json("No se ha podido actualizar la reserva")
    }

})

app.delete("/reservas/:id", async (req, res) => {
    const id = req.params.id
    if (id != undefined && id != ""){
        const reserva = await funcionesReserva.deleteReserva(id)
        res.status(200).json(reserva)
    } else {
        res.status(404).json("Reserva no eliminada")
    }

})


async function DBInit() {
    await Equipos.bulkCreate([
        { nombre : "Instituto", ciudad : "Cordoba", fechaFundacion: '1918-08-08'},
        { nombre : "Talleres", ciudad : "Cordoba", fechaFundacion: '1000-08-08'},
        { nombre : "River", ciudad : "Cordoba", fechaFundacion: '1918-08-08'},
        { nombre : "Boca", ciudad : "Cordoba", fechaFundacion: '1918-08-08'},
        { nombre : "Racing", ciudad : "Cordoba", fechaFundacion: '1918-08-08'},
        { nombre : "Independiente", ciudad : "Cordoba", fechaFundacion: '1918-08-08'},
        { nombre : "SanLorenzo", ciudad : "Cordoba", fechaFundacion: '1918-08-08'},
        { nombre : "Huracán", ciudad : "Cordoba", fechaFundacion: '1918-08-08'},
        { nombre : "Quilmes", ciudad : "Cordoba", fechaFundacion: '1918-08-08'},
    ]);
    await Partidos.bulkCreate([
        {fecha: '1918-08-08', resultado: "2-1", equipo_local: 1, equipo_visitante: 5 },
        {fecha: '1918-12-08', resultado: "0-1", equipo_local: 4, equipo_visitante: 7 },
        {fecha: '1914-08-24', resultado: "5-3", equipo_local: 1, equipo_visitante: 4 },
        {fecha: '1920-05-08', resultado: "2-0", equipo_local: 6, equipo_visitante: 1 },
        {fecha: '1956-08-06', resultado: "1-1", equipo_local: 2, equipo_visitante: 5 },
        {fecha: '1923-07-30', resultado: "8-1", equipo_local: 3, equipo_visitante: 1 }
    ]

    )
    await Jugadores.bulkCreate([
        { nombre: "Jugador 1", fechaNacimiento: "1990-01-01", lugarNacimiento: "Ciudad 1", edad: 30, equipo_id: 1 },
        { nombre: "Jugador 2", fechaNacimiento: "1991-02-02", lugarNacimiento: "Ciudad 2", edad: 29, equipo_id: 2 },
        { nombre: "Jugador 3", fechaNacimiento: "1992-03-03", lugarNacimiento: "Ciudad 3", edad: 28, equipo_id: 3 },
        { nombre: "Jugador 4", fechaNacimiento: "1993-04-04", lugarNacimiento: "Ciudad 4", edad: 27, equipo_id: 1 },
        { nombre: "Jugador 5", fechaNacimiento: "1994-05-05", lugarNacimiento: "Ciudad 5", edad: 26, equipo_id: 2 },
        { nombre: "Jugador 6", fechaNacimiento: "1995-06-06", lugarNacimiento: "Ciudad 6", edad: 25, equipo_id: 3 },
        { nombre: "Jugador 7", fechaNacimiento: "1996-07-07", lugarNacimiento: "Ciudad 7", edad: 24, equipo_id: 1 },
        { nombre: "Jugador 8", fechaNacimiento: "1997-08-08", lugarNacimiento: "Ciudad 8", edad: 23, equipo_id: 2 },
        { nombre: "Jugador 9", fechaNacimiento: "1998-09-09", lugarNacimiento: "Ciudad 9", edad: 22, equipo_id: 3 },
        { nombre: "Jugador 10", fechaNacimiento: "1999-10-10", lugarNacimiento: "Ciudad 10", edad: 21, equipo_id: 1 },
        { nombre: "Jugador 11", fechaNacimiento: "2000-11-11", lugarNacimiento: "Ciudad 11", edad: 20, equipo_id: 2 },
        { nombre: "Jugador 12", fechaNacimiento: "2001-12-12", lugarNacimiento: "Ciudad 12", edad: 19, equipo_id: 3 },
        { nombre: "Jugador 13", fechaNacimiento: "2002-01-13", lugarNacimiento: "Ciudad 13", edad: 18, equipo_id: 1 },
        { nombre: "Jugador 14", fechaNacimiento: "2003-02-14", lugarNacimiento: "Ciudad 14", edad: 17, equipo_id: 2 },
        { nombre: "Jugador 15", fechaNacimiento: "2004-03-15", lugarNacimiento: "Ciudad 15", edad: 16, equipo_id: 3 },
        { nombre: "Jugador 16", fechaNacimiento: "2005-04-16", lugarNacimiento: "Ciudad 16", edad: 15, equipo_id: 1 },
        { nombre: "Jugador 17", fechaNacimiento: "2006-05-17", lugarNacimiento: "Ciudad 17", edad: 14, equipo_id: 2 },
        { nombre: "Jugador 18", fechaNacimiento: "2007-06-18", lugarNacimiento: "Ciudad 18", edad: 13, equipo_id: 3 },
        { nombre: "Jugador 19", fechaNacimiento: "2008-07-19", lugarNacimiento: "Ciudad 19", edad: 12, equipo_id: 1 },
        { nombre: "Jugador 20", fechaNacimiento: "2009-08-20", lugarNacimiento: "Ciudad 20", edad: 11, equipo_id: 2 },
        { nombre: "Jugador 21", fechaNacimiento: "2010-09-21", lugarNacimiento: "Ciudad 21", edad: 10, equipo_id: 3 },
        { nombre: "Jugador 22", fechaNacimiento: "2011-10-22", lugarNacimiento: "Ciudad 22", edad: 9, equipo_id: 1 },
        { nombre: "Jugador 23", fechaNacimiento: "2012-11-23", lugarNacimiento: "Ciudad 23", edad: 8, equipo_id: 2 },
        { nombre: "Jugador 24", fechaNacimiento: "2013-12-24", lugarNacimiento: "Ciudad 24", edad: 7, equipo_id: 3 },
        { nombre: "Jugador 25", fechaNacimiento: "2014-01-25", lugarNacimiento: "Ciudad 25", edad: 6, equipo_id: 1 },
        { nombre: "Jugador 26", fechaNacimiento: "2015-02-26", lugarNacimiento: "Ciudad 26", edad: 5, equipo_id: 2 },
        { nombre: "Jugador 27", fechaNacimiento: "2016-03-27", lugarNacimiento: "Ciudad 27", edad: 4, equipo_id: 3 },
        { nombre: "Jugador 28", fechaNacimiento: "2017-04-28", lugarNacimiento: "Ciudad 28", edad: 3, equipo_id: 1 },
        { nombre: "Jugador 29", fechaNacimiento: "2018-05-29", lugarNacimiento: "Ciudad 29", edad: 2, equipo_id: 2 },
        { nombre: "Jugador 30", fechaNacimiento: "2019-06-30", lugarNacimiento: "Ciudad 30", edad: 1, equipo_id: 3 },
        { nombre: "Jugador 31", fechaNacimiento: "1990-01-01", lugarNacimiento: "Ciudad 31", edad: 30, equipo_id: 1 },
        { nombre: "Jugador 32", fechaNacimiento: "1991-02-02", lugarNacimiento: "Ciudad 32", edad: 29, equipo_id: 2 },
        { nombre: "Jugador 33", fechaNacimiento: "1992-03-03", lugarNacimiento: "Ciudad 33", edad: 28, equipo_id: 3 },
        { nombre: "Jugador 34", fechaNacimiento: "1993-04-04", lugarNacimiento: "Ciudad 34", edad: 27, equipo_id: 1 },
        { nombre: "Jugador 35", fechaNacimiento: "1994-05-05", lugarNacimiento: "Ciudad 35", edad: 26, equipo_id: 2 },
        { nombre: "Jugador 36", fechaNacimiento: "1995-06-06", lugarNacimiento: "Ciudad 36", edad: 25, equipo_id: 3 },
        { nombre: "Jugador 37", fechaNacimiento: "1996-07-07", lugarNacimiento: "Ciudad 37", edad: 24, equipo_id: 1 },
        { nombre: "Jugador 38", fechaNacimiento: "1997-08-08", lugarNacimiento: "Ciudad 38", edad: 23, equipo_id: 2 },
        { nombre: "Jugador 39", fechaNacimiento: "1998-09-09", lugarNacimiento: "Ciudad 39", edad: 22, equipo_id: 3 },
        { nombre: "Jugador 40", fechaNacimiento: "1999-10-10", lugarNacimiento: "Ciudad 40", edad: 21, equipo_id: 1 },
        { nombre: "Jugador 41", fechaNacimiento: "2000-11-11", lugarNacimiento: "Ciudad 41", edad: 20, equipo_id: 2 },

    ])

    await Estadisticas.bulkCreate([
        {cant_goles: 5, cant_asistencias: 2, jugador_id: 3, partido_id: 6},
        {cant_goles: 3, cant_asistencias: 1, jugador_id: 6, partido_id: 6},
        {cant_goles: 2, cant_asistencias: 2, jugador_id: 1, partido_id: 1}
    ])

    await Estadio.bulkCreate([
        {nombre: "Estadio 1", capacidad: 300, fechaConstruccion: "1978-10-06", equipo_id: 1},
        {nombre: "Estadio 2", capacidad: 180, fechaConstruccion: "1991-01-07", equipo_id: 2},
        {nombre: "Estadio 3", capacidad: 250, fechaConstruccion: "1954-10-10", equipo_id: 3},
        {nombre: "Estadio 4", capacidad: 300, fechaConstruccion: "1977-11-10", equipo_id: 4},
        {nombre: "Estadio 5", capacidad: 300, fechaConstruccion: "1978-05-06", equipo_id: 5},
        {nombre: "Estadio 6", capacidad: 250, fechaConstruccion: "1982-10-04", equipo_id: 6},
        {nombre: "Estadio 7", capacidad: 150, fechaConstruccion: "1946-01-10", equipo_id: 7},
        {nombre: "Estadio 8", capacidad: 180, fechaConstruccion: "1950-05-10", equipo_id: 8},
        {nombre: "Estadio 9", capacidad: 300, fechaConstruccion: "1980-12-06", equipo_id: 9},
    ])
    
    await Reserva.bulkCreate([
        {hora: "14:30", fechaReserva: "2023-10-06", estadio_id: 1},
        {hora: "14:35", fechaReserva: "2023-10-06", estadio_id: 1},
        {hora: "15:00", fechaReserva: "2023-10-06", estadio_id: 1},
        {hora: "14:30", fechaReserva: "2023-11-05", estadio_id: 2},
        {hora: "14:33", fechaReserva: "2023-10-06", estadio_id: 2},
        {hora: "14:50", fechaReserva: "2023-10-06", estadio_id: 2},
        {hora: "19:30", fechaReserva: "2023-05-07", estadio_id: 3},
        {hora: "19:40", fechaReserva: "2023-05-07", estadio_id: 3},
        {hora: "20:10", fechaReserva: "2023-05-07", estadio_id: 3},
        {hora: "14:30", fechaReserva: "2023-10-06", estadio_id: 4},
        {hora: "14:33", fechaReserva: "2023-10-06", estadio_id: 4},
        {hora: "14:34", fechaReserva: "2023-10-06", estadio_id: 4},
        {hora: "14:55", fechaReserva: "2023-10-06", estadio_id: 4},
        {hora: "11:29", fechaReserva: "2023-11-06", estadio_id: 5},
        {hora: "10:31", fechaReserva: "2023-09-09", estadio_id: 6},
        {hora: "10:50", fechaReserva: "2023-09-09", estadio_id: 6},
        {hora: "20:49", fechaReserva: "2023-10-10", estadio_id: 7},
        {hora: "20:30", fechaReserva: "2023-10-10", estadio_id: 7},
        {hora: "21:00", fechaReserva: "2023-10-10", estadio_id: 7},
    ])

};

const PORT = process.env.PORT || 3000;

DBInit().then(() => 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    )

module.exports = {sequelize, app, Jugadores, Equipos, Partidos, Estadisticas, Estadio, Reserva}

