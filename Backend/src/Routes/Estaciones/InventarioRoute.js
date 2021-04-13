const express = require("express");
const router = express.Router();
const InventarioController = require("../../Controller/Estaciones/InventarioController");

router.get("/list",InventarioController.list);
router.get("/listHerramienta" , InventarioController.listHerramienta);
router.get("/listMaterial", InventarioController.listMaterial);
router.post("/apartar", InventarioController.Apartar);
router.post("/devolver", InventarioController.Devolver);
router.post("/devoluciones",InventarioController.Devoluciones);
router.post("/addinventario", InventarioController.AddInventario);
router.post("/Edith",InventarioController.EditH);
router.post("/cerrarSesion", InventarioController.Cerrar);
module.exports = router;