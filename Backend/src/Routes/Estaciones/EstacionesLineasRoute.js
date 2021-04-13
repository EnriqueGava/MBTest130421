const express = require("express");
const router = express.Router();
const estacioneslineaController = require("../../Controller/Estaciones/EstacionesLineasController");

router.get("/list" , estacioneslineaController.list);
router.get("/estacionlinea/:id", estacioneslineaController.find);
router.put("/nuevo/:linea/:est",estacioneslineaController.nuevo);
router.get("/getId/:est",estacioneslineaController.findID);

module.exports = router;