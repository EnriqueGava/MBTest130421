const Sequelize = require("sequelize")
const db = require("../../Config/db")


const Falla = db.define(
    'falla',
    {
        Id_Falla:{
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        Id_Parte: {
        allowNull: false,
        type: Sequelize.INTEGER,
          references: {
            model: 'partes',
            key: 'Id_partes'
        }
      },
      falla: {
        allowNull: true,
        type: Sequelize.STRING,
      },   
      clave: {
        allowNull: true,
        type: Sequelize.STRING,
      }    
    },
    {
        freezeTableName: true
}
);


module.exports = Falla;