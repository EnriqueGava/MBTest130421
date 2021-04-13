const Sequelize = require("sequelize")
const db = require("../../Config/db");
const Estaciones = require("./estaciones");

const Lineas = db.define(
    'lineas',
    {
        Id_linea: {
            type: Sequelize.STRING,
            primaryKey: true
           
        },
        nombre_li: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true
}
);

module.exports = Lineas;