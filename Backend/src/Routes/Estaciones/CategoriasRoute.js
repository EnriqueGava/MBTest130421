const express = require("express");
const router = express.Router();
const categoriaController = require("../../Controller/Estaciones/CategoriasController");

router.get("/list/:id" , categoriaController.list);
//router.get("/estacionlinea/:id", estacioneslineaController.find);

module.exports = router;