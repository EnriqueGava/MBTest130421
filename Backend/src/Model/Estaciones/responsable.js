const Sequelize = require("sequelize")
const db = require("../../Config/db");

const Responsable = db.define(
    'responsable',
    {
        Id_Responsable: {
            allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER  
        },
		
        Cuadrilla_Id: {
            allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'cuadrilla',
          key: 'Id_Cuadrilla'
        }
		},
	
	    firma: {
        allowNull: true,
        type: Sequelize.TEXT
      }
	},
    {
        freezeTableName: true
}
);

module.exports = Responsable;