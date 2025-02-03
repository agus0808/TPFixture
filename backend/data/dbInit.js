const { Sequelize } = require("sequelize");
require("dotenv").config(); // Carga variables del archivo .env

const sequelize = new Sequelize(
  "byx11mfgs43epsa3hvql",  // Reemplaza con tu base de datos
  "uumge215csmsmy48",       // Reemplaza con tu usuario
  "RDsK7WWdMlJqZLbTdRFE",   // Reemplaza con tu contraseña
  {
    host: "byx11mfgs43epsa3hvql-mysql.services.clever-cloud.com",  // Reemplaza con tu host
    port: 3306,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false // Desactiva timestamps globalmente
    }
  }
);

sequelize
  .authenticate()
  .then(() => console.log("✅ Conectado a MySQL en Clever Cloud 🚀"))
  .catch((error) => console.error("❌ Error al conectar con MySQL:", error));

module.exports = { sequelize };
