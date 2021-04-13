const Partes = require("../../Model/Estaciones/partes");
const db = require("../../Config/db");
const {QueryTypes} = require("sequelize");
const sequelize = require("../../Config/db");
const controller = {};
db.sync();

controller.list = async(req, res) => {
    const partes = await sequelize.query(`SELECT tbl.Id_partes,tbl.Id_parte, nombre_pa, ccpartes.Id_ccp
    FROM partes AS tbl
    inner JOIN ccpartes
    ON ccpartes.Id_Part =tbl.Id_partes
    INNER JOIN categoriaconceptos
    on categoriaconceptos.Id_cc = ccpartes.Id_cc
    WHERE categoriaconceptos.concepto_id = (:concepto)
    AND categoriaconceptos.Id_cc = (:idCC)`,{
        replacements: {
            concepto: req.params.concepto,
            idCC: req.params.idCC
        },
        type: QueryTypes.SELECT
    });

    res.send(partes);
}

controller.find = async(req, res) => {
    const parte = await sequelize.query(`SELECT tbl.Id_parte, nombre_pa,tbl.Id_partes,ccpartes.Id_ccp
    FROM partes AS tbl
    inner JOIN ccpartes
    ON ccpartes.Id_Part = tbl.Id_partes
    INNER JOIN categoriaconceptos
    on categoriaconceptos.Id_cc = ccpartes.Id_cc  
    INNER JOIN categoria
    ON categoria.Id_categoria= categoriaconceptos.categoria_id
    WHERE categoria.linea = (:id)
    AND categoriaconceptos.concepto_id= (:concepto)
    AND tbl.Id_parte = (:parte)`,{
        replacements: {
            id: req.params.id,
            concepto: req.params.concepto,
            parte: req.params.parte
        },
        type: QueryTypes.SELECT
    });

    res.send(parte);

}



module.exports = controller;