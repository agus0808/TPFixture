const { Sequelize } = require("sequelize");
require("dotenv").config(); // Carga variables del archivo .env
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, 
  process.env.MYSQL_USER, 
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
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
