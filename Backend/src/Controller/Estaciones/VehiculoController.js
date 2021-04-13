const Vehiculo = require("../../Model/Estaciones/Vehiculo");
const db = require("../../Config/db");
const {QueryTypes} = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../../Config/db");
const controller = {};
db.sync();


controller.list = async(_,res) => {
    await Vehiculo.findAll()
        .then(result => {
            res.send({success: true, data: result});
        })
        .catch(err => {
            res.send({success: false, data: err});
        })
}

module.exports = controller;