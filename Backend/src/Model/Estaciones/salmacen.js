const Sequelize = require("sequelize");
const sequelize = require("../../Config/db");
const db = require("../../Config/db");
const SAlmacen = db.define(
    'salmacen',
    {
      NumSA: {
            allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        Firma_EMantenimiento:{
            allowNull: false,
            type: Sequelize.INTEGER,
             references: {
              model: 'mantenimiento',
              key: 'Id_Mantenimiento'
        }
        },  
        Fecha_Entrega:{
            allowNull: true,
        type: Sequelize.DATE
          },  
        Fecha_Devolu: {
            allowNull: true,
            type: Sequelize.DATE
        }
        ,
        Observaciones: {
            allowNull: true,
            type: Sequelize.STRING
        }
    },    
    {
      freezeTableName: true
    }
  );
    module.exports = SAlmacen;