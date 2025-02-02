const { Equipos } = require("./equipo")
const { Jugadores } = require("./jugador")
const { Estadisticas } = require("./Estadistica")
const { Partidos } = require("./Partido")
const { Estadio } = require("./estadio")
const { Reserva } = require("./reserva")

Equipos.hasMany(Jugadores, { foreignKey: 'equipo_id', onDelete: "CASCADE" })
Estadisticas.belongsTo(Partidos, {foreignKey: 'partido_id'})
Estadisticas.belongsTo(Jugadores, {foreignKey: 'jugador_id'})
Jugadores.belongsTo(Equipos, { foreignKey: 'equipo_id'});
Jugadores.hasOne(Estadisticas, { foreignKey: 'jugador_id', onDelete: "CASCADE" })
Partidos.hasOne(Estadisticas, { foreignKey: 'partido_id', onDelete: "CASCADE" })
Reserva.belongsTo(Estadio, {foreignKey: "estadio_id"})
Estadio.belongsTo(Equipos, {foreignKey: "equipo_id"} )
Equipos.hasOne(Estadio, {foreignKey: "equipo_id"})



module.exports = {Equipos, Jugadores, Estadisticas, Partidos,Estadio, Reserva}