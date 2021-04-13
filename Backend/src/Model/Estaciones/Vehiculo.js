const Sequelize = require("sequelize")
const db = require("../../Config/db");

const Vehiculo = db.define(
    'Vehiculo',
    {
        Placa: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.STRING  
        },
		
        Marca: {
            allowNull: true,
            type: Sequelize.STRING,
        
		},
	
	    Modelo: {
            allowNull: true,
            type: Sequelize.INTEGER
        },

        Kilometraje: {
            allowNull: true,
            type: Sequelize.FLOAT
            }
	  
	},
	
    {
        freezeTableName: true
}
);

module.exports = Vehiculo;