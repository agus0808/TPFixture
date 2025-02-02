const { DataTypes, Model }  = require("sequelize");
const {sequelize} = require("../data/dbInit");

class Partidos extends Model {}

Partidos.init({
    partido_id : {
        type : DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allownull: false
    },
    fecha : {
        type : DataTypes.DATEONLY,
        allownull: false
    },
    resultado : {
        type : DataTypes.TEXT,
        allowNull : false
    },
    equipo_local : {
        type: DataTypes.INTEGER,
        references : {
            model : 'Equipos',
            key : "equipo_id"
        },
        allowNull : false
    },
    equipo_visitante : {
        type: DataTypes.INTEGER,
        references : {
            model : 'Equipos',
            key : "equipo_id"
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
    modelName: 'Partidos',
    tableName: 'partidos' ,
    timestamps: false // Desactivar createdAt y updatedAt

})

module.exports = {Partidos}