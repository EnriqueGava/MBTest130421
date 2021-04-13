const Sequelize = require("sequelize")
const db = require("../../Config/db")

const categorias = require("./categorias");

const Conceptos = db.define(
    'conceptos',
    {
        Id_concepto: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nombre_co: {
        allowNull: false,
        type: Sequelize.STRING
      },
      funcion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      especificacion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      m2: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      }
        
    },
    {
        freezeTableName: true
}
);


module.exports = Conceptos;