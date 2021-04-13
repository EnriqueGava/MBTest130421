const Sequelize = require("sequelize");
const sequelize = require("../../Config/db");
const db = require("../../Config/db");
const Strabajo = db.define(
    'strabajo',
    {
      NumST: {
            allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        NumSA: {
            allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'salmacen',
            key: 'NumSA'
      }
        },
        NumOrden: {
            allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'levantamientos',
            key: 'Id_numorden'
      }
        },
        Id_responsable: {
            allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'responsable',
            key: 'Id_Responsable'
      }
        },
        Placa:{
            allowNull: false,
            type: Sequelize.STRING,
            references: {
              model: 'responsable',
              key: 'Id_Responsable'
            }
        },
        Fecha_Inicio:{
            allowNull: true,
        type: Sequelize.DATE
        },  
        Fecha_Fin: {
            allowNull: true,
            type: Sequelize.DATE
        },
        Observaciones: {
            allowNull: true,
            type: Sequelize.STRING
        },
        fotofinal: {
            allowNull: true,
            type: Sequelize.TEXT
        },
        Id_phartner: {
          allowNull: true,
          type: Sequelize.INTEGER,
          references: {
            model: "cuadrilla",
            key: "Id_Cuadrilla" 
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
    },    
    {
      freezeTableName: true
    }
  );
    module.exports = Strabajo;