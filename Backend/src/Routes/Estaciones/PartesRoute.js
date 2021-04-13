const express = require("express");
const router = express.Router();
const partesController = require("../../Controller/Estaciones/PartesController");

router.get("/list/:concepto/:idCC" , partesController.list);
router.get("/list/:id/:concepto/:parte",partesController.find);
module.exports = router;