const express = require("express");
const router = express.Router();
const strabajocontroller = require("../../Controller/Estaciones/strabajoController");

router.post("/mostrarst",strabajocontroller.listst);
router.get("/listst",strabajocontroller.listST);
router.post("/material",strabajocontroller.listmat);
router.post("/fechafin",strabajocontroller.actualizarFecha);
router.put("/signjud/:id/:valor",strabajocontroller.signjud);
module.exports = router;