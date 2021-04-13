const Sequelize = require("sequelize")
const db = require("../../Config/db")

const categorias = require("./categorias")
const conceptos = require("./conceptos")
module.exports = db.sequelize.define(
    'categoria_concepto',
    {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
             
        },
        categoriaid:{
            type: Sequelize.STRING,
            references:{
                model: categorias,
                key: 'id'
            }
        },
        conceptoid:{
            type: Sequelize.STRING,
            references:{
                model: conceptos,
                key: 'id'
            }
        }
    }
)
estaciones.hasmany(categorias),
estaciones.hasmany(conceptos)