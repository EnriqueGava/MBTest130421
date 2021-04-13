const db = require("../../Config/db");
const controller = {};
const {QueryTypes} = require("sequelize");
const sequelize = require("../../Config/db");
const Cantidad = require("../../Model/Estaciones/cantidad");
db.sync();
