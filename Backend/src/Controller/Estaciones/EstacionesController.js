const Estaciones = require("../../Model/Estaciones/estaciones");
const db = require("../../Config/db");
const Lineas = require("../../Model/Estaciones/lineas");
const controller = {};
const {QueryTypes} = require("sequelize");
const sequelize = require("../../Config/db");
db.sync();

controller.list = async(_, res) => {
    let estaciones = await Estaciones.findAll()
    .then(rows => {
        res.send(rows);
    })
};

controller.find = async(req, res) => {
    const estaciones = await sequelize.query(`select id_estacion,nombre_es
    FROM estaciones
    INNER JOIN estacioneslineas
    ON estacioneslineas.estacion_id=estaciones.id_estacion
    WHERE estacioneslineas.linea_id = (:id)`,{
        replacements: {id: req.params.id},
        type: QueryTypes.SELECT
    })
};

controller.findE = async(req, res) => {
    const listar = await Estaciones.findAll({
        where: {
            nombre_es: req.params.id,
        }
    })
        .then(rows => {
            return rows;
        })
        .catch(err => {
            return err;
        })

    res.json(listar);
}

//Crear
controller.newEs = async (req, res) => {
    console.log(req.body);
    const dataSet = await Estaciones.create({
        nombre_es: req.body.nombre,
        origen: req.body.origen,
        destino: req.body.destino
    })
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        })
    console.log(dataSet);
    res.json(dataSet);
}


module.exports = controller;
