const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../data/dbInit");

class Estadio extends Model {}

Estadio.init({
    estadio_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaConstruccion: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    equipo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Equipos",
            key: "equipo_id"
        },
        
    },
    eliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notEmpty: {
                args: true,
                msg: "El estado eliminado es requerido"
            }
        }
    }
}, {
    sequelize,
    modelName: "Estadio",
    tableName: "estadio",
    timestamps: false // Desactivar createdAt y updatedAt
})

module.exports = {Estadio}