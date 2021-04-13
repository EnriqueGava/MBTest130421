const Sentidos = require("../../Model/Estaciones/sentidos");
const ELsentidos = require("../../Model/Estaciones/elsentidos");
const db = require("../../Config/db");
const Lineas = require("../../Model/Estaciones/lineas");
const controller = {};
const {QueryTypes} = require("sequelize");
const sequelize = require("../../Config/db");
db.sync();

controller.list = async(_, res) => {
    let sentido = await Sentidos.findAll()
    .then(rows => {
        res.send(rows);
    })
};

controller.find = async(req, res) => {
    const sentido = await sequelize.query(`select Id_els,nombre_se 
    FROM sentidos
    INNER JOIN elsentidos
    ON elsentidos.sentido_id=sentidos.Id_sentido
    WHERE elsentidos.el_id = (:id)`,{
        replacements: {id: req.params.id},
        type: QueryTypes.SELECT
    });
    res.json(sentido);
};

controller.nuevo  = async (req, res) => {
	const newS = await ELsentidos.create({
		el_id: req.params.el,
		sentido_id: req.params.sentido	
	})
	 .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        })
	 res.json(newS);	
}

module.exports = controller;
