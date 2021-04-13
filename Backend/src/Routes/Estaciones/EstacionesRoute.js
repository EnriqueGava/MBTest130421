const express = require("express");
const router = express.Router();
const estacionesController = require("../../Controller/Estaciones/EstacionesController");

router.get("/list" , estacionesController.list);
router.get("/linea/:id", estacionesController.find);
router.get("/estid/:id", estacionesController.findE);
router.post("/nuevo",estacionesController.newEs);

module.exports = router;