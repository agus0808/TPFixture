const { DataTypes, Model } = require("sequelize");
const {sequelize} = require("../data/dbInit");

class Equipos extends Model {}

Equipos.init({
    equipo_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ciudad: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaFundacion: {
        type: DataTypes.DATEONLY,
        allowNull: false
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
    modelName: 'Equipos',
    tableName: 'equipos' ,
    timestamps: false // Desactivar createdAt y updatedAt

});


module.exports = { Equipos };

