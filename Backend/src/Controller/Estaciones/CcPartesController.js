const ccpartes = require("../../Model/Estaciones/ccpartes");
const db = require("../../Config/db");
const controller = {};
db.sync();

controller.list = async(req,res) => {
    const ccparte= await ccpartes.findAll({
        where: {Id_cc: req.params.id}
    })
    .then(rows => {
        return rows;
    })
    .catch(err => {

    })
    res.json(ccparte);
};

module.exports = controller;