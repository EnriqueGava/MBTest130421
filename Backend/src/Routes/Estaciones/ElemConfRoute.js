const express = require("express");
const router = express.Router();
const upload = require('../../Libs/storage')
const elemCoController = require("../../Controller/Estaciones/ElementosConfController");

router.get("/list/:id" , elemCoController.list);

router.get("/estline/:id" , elemCoController.estline);
router.get("/images/:id" , elemCoController.imageArray);
router.post("/prueba",elemCoController.prueba);
router.post("/upload/", upload.any('imagen'), elemCoController.upload);
router.post("/uploadImgMant/", upload.any('imagenes'), elemCoController.uploadImgMant);
router.get("/elemento/:id", elemCoController.find)
router.get("/unsave/:id",elemCoController.unsave);
router.get("/delete/:id",elemCoController.deleteElemento);

router.get("/imagesf/:id" , elemCoController.imageArrayF);
router.post("/test/",upload.any('imagenes'),elemCoController.test);
module.exports = router;