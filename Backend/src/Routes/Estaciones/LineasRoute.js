const express = require("express");
const router = express.Router();
const lineasController = require("../../Controller/Estaciones/LineasController");

router.get("/list" , lineasController.list);
router.put("/newl/:id/:valor",lineasController.nuevo);

module.exports = router;