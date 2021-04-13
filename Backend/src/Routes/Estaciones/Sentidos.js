const express = require("express");
const router = express.Router();
const sentidosController = require("../../Controller/Estaciones/SentidosController");

router.get("/list" , sentidosController.list);

module.exports = router;