const Sentidos = require("../../Model/Estaciones/sentidos");
const db = require("../../Config/db");
const Lineas = require("../../Model/Estaciones/lineas");
const controller = {};
const {QueryTypes} = require("sequelize");
const sequelize = require("../../Config/db");
db.sync();

controller.list = async(_, res) => {
    let sentidos = await Sentidos.findAll()
    .then(rows => {
        res.send(rows);
    })
};




module.exports = controller;
