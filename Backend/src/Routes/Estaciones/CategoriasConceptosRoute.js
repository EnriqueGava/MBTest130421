const express = require("express");
const router = express.Router();
const categoriaconceptosController = require("../../Controller/Estaciones/CategoriasConceptosController");

router.get("/list/:id" , categoriaconceptosController.list);
router.get("/code/:id",categoriaconceptosController.code);
//router.get("/estacionlinea/:id", estacioneslineaController.find);

module.exports = router;