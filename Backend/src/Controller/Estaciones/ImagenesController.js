const Imagenes = require("../../Model/Estaciones/imagenes");
const db = require("../../Config/db");
const controller = {};
db.sync();

controller.list = async(req, res) => {
    const dataGet = await Imagenes.findAll({ attributes: ['id', 'clave', 'categoria', 'concepto', 'id_parte', 'falla'], raw: true })
    .then(rows => {
        return rows;
    })
    .catch(err => {

    })
    res.json(dataGet);

};

controller.imageArray = async(req, res) => {
    const imageGet = await Imagenes.findAll({ attributes: ['imagenes'], where: { id: req.params.id }})
    .then(rows => {
        return rows;
    })
    .catch(err => {

    })
    res.json(imageGet);

};

controller.upload = async(req, res) => {
	const dataSet = await Imagenes.create(req.body)
    .then(data => {
        return data;
    })
    .catch(err => {

    })
    res.json(dataSet);
};



module.exports = controller;