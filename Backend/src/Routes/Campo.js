const express = require("express");
const campo = express.Router();
const db = require("../db");

campo.post("/nuevoL", (req, res) => {
    res.send(req.body)
});

module.exports  = campo