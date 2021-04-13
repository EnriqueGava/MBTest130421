const Sequelize = require("sequelize")
const db = require("../../Config/db")

const conceptos = require("./conceptos");

const Categorias = db.define(
    'categoria',
    {
        Id_categoria:  {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_ca: {
        allowNull: false,
        type: Sequelize.STRING
      },
      linea: {
        allowNull: false,
        type: Sequelize.STRING
      }
        
    },
    {
        freezeTableName: true
}
);


module.exports = Categorias;