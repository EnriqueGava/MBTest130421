const express = require("express");
const router = express.Router();
const fallas = require("../../Controller/Estaciones/FallaController");

router.get("/list/:id/:idccp" , fallas.list);

module.exports = router;