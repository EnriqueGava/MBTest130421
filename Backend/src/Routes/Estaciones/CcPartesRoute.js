const express = require("express");
const router = express.Router();
const ccpartes = require("../../Controller/Estaciones/CcPartesController");

router.get("/list/:id" , ccpartes.list);

module.exports = router;