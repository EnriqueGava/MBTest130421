const Lineas = require("../../Model/Estaciones/lineas");
const db = require("../../Config/db");
const controller = {};
db.sync();

controller.list = async(_, res) => {
    let lineas = await Lineas.findAll()
    .then(rows => {
        res.send(rows);
    })
};

controller.nuevo  = async (req, res) => {
	const newL = await Lineas.create({
		Id_linea: req.params.id,
		nombre_li: req.params.valor	
	})
	 .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        })
	 res.json(newL);	
}

module.exports = controller;
