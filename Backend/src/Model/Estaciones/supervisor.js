const Sequelize = require("sequelize")
const db = require("../../Config/db");

const Sup = db.define(
    'supervisor',
    {
        Supervisor_Id: {
            allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER  
        },
		
        Username: {
            allowNull: true,
        type: Sequelize.STRING,
        references: {
          model: 'user',
          key: 'User_ID'
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

module.exports = Sup;