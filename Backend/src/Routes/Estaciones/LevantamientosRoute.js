const express = require("express");
const router = express.Router();
const levantamientosControler = require("../../Controller/Estaciones/LevantamientosController");

router.get("/list/:id",levantamientosControler.list);
router.get("/listar",levantamientosControler.listar);
router.post("/nuevo",levantamientosControler.nuevo);
router.delete("/borrar/:id",levantamientosControler.borrar);
router.put("/terminar/:valor/:id",levantamientosControler.terminar);
router.put("/signjud/:id/:valor",levantamientosControler.signjud);
router.put("/signsup/:id/:valor",levantamientosControler.signsup);
router.get("/listarun/:id",levantamientosControler.listarun);
router.get("/mantenimiento", levantamientosControler.listMantenimiento);
module.exports = router;