const Sequelize = require("sequelize")
const db = require("../../Config/db")

const Partes = db.define(
    'partes',
    {
        Id_parte: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nombre_pa: {
        allowNull: false,
        type: Sequelize.STRING
      },
      falla: {
        allowNull: false,
        type: Sequelize.STRING
      },        
    },
    {
        freezeTableName: true
}
);


module.exports = Partes;