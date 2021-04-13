const express = require("express");
const router = express.Router();
const salmacencontroller = require("../../Controller/Estaciones/SAlmacenController");

router.post("/insert" , salmacencontroller.insert);
router.get("/getdate" , salmacencontroller.getdate);
router.get("/getsa" , salmacencontroller.getSA);
router.post("/devolucion", salmacencontroller.devolucion);
router.get("/fecha_d/:num", salmacencontroller.fecha_d);
module.exports = router;