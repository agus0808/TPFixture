const { DataTypes, Model } = require("sequelize");
const {sequelize} = require("../data/dbInit");

class Estadisticas extends Model {}

Estadisticas.init({
    estadistica_id : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allownull: false
    },
    cant_goles : {
        type : DataTypes.INTEGER,
        allownull: false
    },
    cant_asistencias : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    jugador_id : {
        type: DataTypes.INTEGER,
        references : {
            model : 'Jugadores',
            key : "jugador_id"
        },
        allowNull : false
    },
    partido_id : {
        type: DataTypes.INTEGER,
        references : {
            model : 'Partidos',
            key : "partido_id"
        },
        allowNull : false
    },
    eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notEmpty: {
                args: true,
                msg: 'El estado eliminado es requerido.'
            }
        }
    }
}, {
    sequelize,
    modelName: 'Estadisticas',
    tableName: 'estadisticas',
    timestamps: false // Desactivar createdAt y updatedAt

})

module.exports = {Estadisticas}