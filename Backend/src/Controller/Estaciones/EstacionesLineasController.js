const EstacionesLinea = require("../../Model/Estaciones/estacionlinea");
const Estacion = require("../../Model/Estaciones/estaciones")
const db = require("../../Config/db");
const Lineas = require("../../Model/Estaciones/lineas");
const controller = {};
const {QueryTypes} = require("sequelize");
const sequelize = require("../../Config/db");
db.sync();

controller.list = async(_, res) => {
    let estaciones = await EstacionesLinea.findAll()
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
    });
    res.json(estaciones);
};

controller.nuevo  = async (req, res) => {
	const newL = await EstacionesLinea.create({
		linea_id: req.params.linea,
		estacion_id: req.params.est	
	})
	 .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        })
	 res.json(newL);	
}

controller.findID = async(req, res) => {
    const el_id = await sequelize.query(`select Id_el
    FROM estacioneslineas
    WHERE estacioneslineas.estacion_id = (:id)`,{
        replacements: {id: req.params.est},
        type: QueryTypes.SELECT
    });
    res.json(el_id);
};

module.exports = controller;


