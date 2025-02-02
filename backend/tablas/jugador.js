const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../data/dbInit");

class Jugadores extends Model {}

Jugadores.init({
    jugador_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    lugarNacimiento: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    equipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Equipos',
            key: "equipo_id"
        }
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
    modelName: 'Jugadores',
    tableName: 'jugadores' ,
    timestamps: false // Desactivar createdAt y updatedAt

});


module.exports = { Jugadores }