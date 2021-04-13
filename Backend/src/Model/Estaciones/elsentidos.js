const Sequelize = require("sequelize")
const db = require("../../Config/db")
const Levantamientos= require("./levantamientos");


const ElSentidos = db.define(
    'elsentidos',
    {
        Id_els: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      el_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
          references: {
            model: 'estaciones',
            key: 'Id_estacion'
        }
      },
      sentido_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
            references: {
            model: 'sentidos',
            key: 'Id_sentido'
        }
      }
  
    },
    {
        freezeTableName: true
}
);


module.exports = ElSentidos;