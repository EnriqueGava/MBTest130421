const express = require('express');
const router = express.Router();

// User Controller
const userController = require('../Controller/userController');

// Routes
router.post("/register", userController.register);
router.post("/encript", userController.register2);
router.post("/desencrypt", userController.desencriptimagen);
router.post("/login", userController.login);
router.get("/profile", userController.profile);
router.get("/list", userController.list);
router.get("/photo/:id", userController.oneUser);
router.post("/editar", userController.editar);
router.post("/validate", userController.validate);
router.post("/user", userController.user);
router.post("/validatePass", userController.ValidatePass);
router.post("/changePass", userController.changePass);

module.exports = router;