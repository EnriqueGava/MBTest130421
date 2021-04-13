const express = require("express");
const router = express.Router();
const VehiculoController = require("../../Controller/Estaciones/VehiculoController");

router.get("/list" , VehiculoController.list);

module.exports = router;