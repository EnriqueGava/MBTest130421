const Sequelize = require("sequelize")
const db = require("../../Config/db")

const sentidos = require("./sentidos");

const EstacionesLineas = db.define(
    'estacioneslineas',
    {
      Id_el: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
      estacion_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'estaciones',
            key: 'Id_estacion'
        }
    },
      linea_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'lineas',
          key: 'Id_lineas'
        }
      }
        
    },
    {
        freezeTableName: true
}
);


module.exports = EstacionesLineas;