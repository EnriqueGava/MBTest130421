const Categorias = require("../../Model/Estaciones/categorias");
const db = require("../../Config/db");
const controller = {};
db.sync();

controller.list = async(req, res) => {
    const categorias = await Categorias.findAll({
        where: {linea: req.params.id}
    })
    .then(rows => {
        return rows;
    })
    .catch(err => {

    })
    res.json(categorias);

};



module.exports = controller;
