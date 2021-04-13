const Sequelize = require("sequelize")
const db = require("../../Config/db")

const lineas = require("./lineas");

const Estaciones = db.define(
    'estaciones',
    {
        Id_estacion: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoincrement: true
        },
        nombre_es: {
            allowNull: false,
            type: Sequelize.STRING
          },
          origen: {
            allowNull: false,
            type: Sequelize.STRING
          },
          destino: {
            allowNull: false,
            type: Sequelize.STRING
          }
        
    },
    {
        freezeTableName: true
}
);


module.exports = Estaciones;