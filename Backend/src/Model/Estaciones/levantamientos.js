const Sequelize = require("sequelize");
const sequelize = require("../../Config/db");
const db = require("../../Config/db")

const Levantamientos = db.define(
  'levantamientos',
  {
    Id_numorden: {
          allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Id_User:{
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'user',
          key: 'User_ID'
      }
      },  
      firmaJud: {
        allowNull: true,
        type: Sequelize.INTEGER,
		 references: {
          model: 'jud',
          key: 'Id_Jud'
      }
      },
      firmasup: {
        allowNull: true,
        type: Sequelize.INTEGER,
		 references: {
          model: 'supervisor',
          key: 'Supervisor_Id'
      }
      },
      estado: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      Fecha:{
        allowNull: false,
        type: Sequelize.DATE
      },
      Generado: {
        allowNull:false,
        type: Sequelize.BOOLEAN
      }
  },    
  {
    freezeTableName: true
  }
);
  module.exports = Levantamientos;