const Sequelize = require("sequelize")
const db = require("../../Config/db");

const Cuadrilla = db.define(
    'cuadrilla',
    {
        Id_Cuadrilla: {
            allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER  
        },
		
        User_Id: {
            allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'user',
          key: 'User_ID'
        }
		},
	
	    Num_Cuadrilla: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
	},
    {
        freezeTableName: true
}
);

module.exports = Cuadrilla;