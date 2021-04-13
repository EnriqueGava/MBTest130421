const Falla = require("../../Model/Estaciones/falla");
const db = require("../../Config/db");
const sequelize = require("../../Config/db");
const {QueryTypes} = require("sequelize");
const controller = {};
db.sync();

controller.list = async(req, res) => {
    const falla = await sequelize.query(`SELECT falla.Id_Falla, falla.Id_ccp, falla.falla, falla.clave
    FROM falla
    INNER JOIN ccpartes
    ON ccpartes.id_ccp = falla.Id_ccp
    WHERE ccpartes.Id_Part = (:id)
    AND ccpartes.Id_ccp = (:idccp);`,{
        replacements: {
            id: req.params.id,
            idccp: req.params.idccp
        },
        type: QueryTypes.SELECT
    });
    res.json(falla);
};

module.exports = controller;
