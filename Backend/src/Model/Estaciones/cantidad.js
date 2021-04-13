const Sequelize = require("sequelize")
const db = require("../../Config/db");

const Cantidad = db.define(
    'Cantidad',
    {
        ID_Cantidad: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER  
        },
		Cantidad: {
            allowNull: false,
            type: Sequelize.INTEGER
        },

        Codigo: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'inventario',
                key: 'Codigo'
            }
		},

        NumSA: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
                model: 'salmacen',
                key: 'NumSA'
            }
		},
	
	    
	},
    {
        freezeTableName: true
}
);

module.exports = Cantidad;