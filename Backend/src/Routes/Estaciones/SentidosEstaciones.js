const express = require("express");
const router = express.Router();
const sentidoslineaController = require("../../Controller/Estaciones/SentidosLineaController");

router.get("/list" , sentidoslineaController.list);
router.get("/sentidoestaciones/:id", sentidoslineaController.find);
router.put("/nuevo/:el/:sentido",sentidoslineaController.nuevo);

module.exports = router;