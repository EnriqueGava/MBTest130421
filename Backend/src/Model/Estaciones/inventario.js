const Sequelize = require("sequelize")
const db = require("../../Config/db");

const Inventario = db.define(
    'inventario',
    {
        Codigo: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER  
        },
		
        Medida: {
            allowNull: true,
            type: Sequelize.STRING,
		},
	
	    Producto: {
            allowNull: true,
            type: Sequelize.STRING
        },

        Partida: {
            allowNull: true,
            type: Sequelize.INTEGER
        },

        Existencia: {
            allowNull:true,
            type: Sequelize.INTEGER
        }
	},
    {
        freezeTableName: true
}
);

module.exports = Inventario;