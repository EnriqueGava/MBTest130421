const express = require("express");
const router = express.Router();
const judController = require("../../Controller/Estaciones/JudController");
const supController = require("../../Controller/Estaciones/SupController");
const mantController = require("../../Controller/Estaciones/MantenimientoController");

router.put("/fjud/:id/",judController.firmaJud);
router.get("/cjud/:id",judController.checkFirma);
router.put("/fsup/:id/",supController.firmaSup);
router.get("/csup/:id",supController.checkFirma);
router.get("/djud/:id",judController.getData);
router.get("/dsup/:id",supController.getData);
router.put("/fmant/:id",mantController.firmaMant);
router.get("/cmant/:id",mantController.checkFirma);
router.get("/dmant/:id",mantController.getData);

module.exports = router;