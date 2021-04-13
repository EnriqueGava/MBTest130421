const Sequelize = require("sequelize")
const db = require("../../Config/db")

const ElementosConformados  = db.define(
    'elementosconformados',
    {
        Id_elemento: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      els_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
          references: {
            model: 'elsentidos',
            key: 'Id_els'
        }
      },
      orden_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
          references: {
            model: 'levantamientos',
            key: 'Id_levantamiento'
        }
      },
	  
	  falla_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
		 references: {
            model: 'falla',
            key: 'Id_falla'
      }},
	  
      imagen: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      tramo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      area: {
        allowNull: true,
        type: Sequelize.DOUBLE
      },
        
    },
    {
        freezeTableName: true
}
);


module.exports = ElementosConformados;