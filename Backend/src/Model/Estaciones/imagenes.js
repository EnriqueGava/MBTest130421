const Sequelize = require("sequelize")
const db = require("../../Config/db")


const Registros = db.define(
    'registros',
    {
        id: {
        allowNull: false,
        primaryKey: true,
		autoIncrement: true,
        type: Sequelize.INTEGER
      },
	     
		linea: {
        allowNull: false,
        type: Sequelize.STRING
      },
	  
		estacion: {
        allowNull: false,
        type: Sequelize.STRING
      },	
	  
		sentido: {
        allowNull: false,
        type: Sequelize.STRING
      },
	  
		clave: {
        allowNull: false,
        type: Sequelize.STRING
      },	
	  
		categoria: {
        allowNull: false,
        type: Sequelize.STRING
      },
	  
		concepto: {
        allowNull: false,
        type: Sequelize.STRING
      },	
	  
		id_parte: {
		   allowNull: false,
        type: Sequelize.STRING,
	  },
	  
		falla: {
        allowNull: false,
        type: Sequelize.STRING
      },
	  
      imagenes: {
        allowNull: false,
        type: Sequelize.TEXT
      },
	 
	  },
       
    {
        freezeTableName: true
}
);

module.exports = Registros;

