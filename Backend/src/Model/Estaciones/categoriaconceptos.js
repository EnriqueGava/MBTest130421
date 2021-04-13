const Sequelize = require("sequelize")
const db = require("../../Config/db")

const ElSentidos = require("./elsentidos");
const Levantamientos= require("./levantamientos");

const CategoriasConceptos = db.define(
    'categoriaconceptos',
    {
      
        Id_cc:{
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      categoria_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
          references: {
            model: 'categoria',
            key: 'Id_categoria'
        }
      },
      concepto_id: {
        allowNull: false,
        type: Sequelize.STRING,
          references: {
            model: 'conceptos',
            key: 'Id_concepto'
        }
      }      
    },
    {
        freezeTableName: true
}
);


module.exports = CategoriasConceptos;