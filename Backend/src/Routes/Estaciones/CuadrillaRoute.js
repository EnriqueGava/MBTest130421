const express = require("express");
const router = express.Router();
const CuadrillaController = require("../../Controller/Estaciones/CuadrillaController");

router.get("/listcua",CuadrillaController.listcuadrillas);
router.post("/partners", CuadrillaController.partners);
router.post("/insertar", CuadrillaController.insert);
router.post("/integrantescu", CuadrillaController.listintegrantes);
router.post("/oncuadrilla",CuadrillaController.oncuadrilla);
router.post("/listst",CuadrillaController.liststrabajo);
router.post("/listmatyveh",CuadrillaController.listmaterialyvehiculo);
module.exports = router;