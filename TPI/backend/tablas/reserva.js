const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../data/dbInit");

class Reserva extends Model {}

Reserva.init({
    reserva_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    fechaReserva: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    estadio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Estadio",
            key: "estadio_id"
        }
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
    modelName: "Reserva",
    tableName: "reserva",
    timestamps: false // Desactivar createdAt y updatedAt

})

module.exports = {Reserva}