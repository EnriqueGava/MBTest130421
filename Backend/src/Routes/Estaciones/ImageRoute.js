const express = require("express");
const router = express.Router();
const upload = require('../../Libs/storage')
const imageController = require("../../Controller/Estaciones/ImagenesController");

router.get("/list/" , imageController.list);

router.get("/images/:id" , imageController.imageArray);

router.post("/upload/", upload.any('imagenes'), imageController.upload);

module.exports = router;