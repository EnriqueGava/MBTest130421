const Sequelize = require("sequelize")
const db = require("../../Config/db");
const EstacionesLineas = require("./estacionlinea");
const Sentidos = db.define(
    'sentidos',
    {
       Id_sentido: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_se: {
        allowNull: false,
        type: Sequelize.STRING
      }
    },
    {
        freezeTableName: true
}
);

module.exports = Sentidos;