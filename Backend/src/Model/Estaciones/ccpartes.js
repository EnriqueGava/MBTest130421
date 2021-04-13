const Sequelize = require("sequelize")
const db = require("../../Config/db")


const CcPartes = db.define(
    'ccpartes',
    {
        Id_ccp:{
        primaryKey: true,
        type: Sequelize.INTEGER
      },
        Id_cc: {
        allowNull: false,
        type: Sequelize.STRING,
          references: {
            model: 'categoriaconceptos',
            key: 'Id_cc'
        }
      },
      Id_Part: {
        allowNull: false,
        type: Sequelize.STRING,
          references: {
            model: 'partes',
            key: 'Id_partes'
        }
      }      
    },
    {
        freezeTableName: true
}
);


module.exports = CcPartes;