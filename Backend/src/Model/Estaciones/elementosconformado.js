const Sequelize = require("sequelize")
const db = require("../database/db")

const caategoria_conceptos = require("./categoria_conceptos")
const estaciones = require("./estaciones")
const levantamientos = require("./levantamientos")


module.exports = db.sequelize.define(
    'categoria_conceptos',
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
             
        },
        estacionid:{
            type: Sequelize.STRING,
            references:{
                model: estaciones,
                key: 'id'
            }
        },
        cacoid:{
            type: Sequelize.STRING,
            references:{
                model: categoria_conceptos,
                key: 'id'
            }
        },
         numordenid:{
            type: Sequelize.INTEGER,
            references:{
                model: levantamientos,
                key: 'id'
            }
        }
        
    }
)
estaciones.hasmany(estaciones),
estaciones.hasmany(caategoria_conceptos),
estaciones.hasmany(levantamientos)