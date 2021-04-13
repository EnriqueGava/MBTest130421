const CategoriasConceptos = require("../../Model/Estaciones/categoriaconceptos");
const db = require("../../Config/db");
const controller = {};
const {QueryTypes} = require("sequelize");
const sequelize = require("../../Config/db");
const Categorias = require("../../Model/Estaciones/categorias");
db.sync();



controller.list = async(req, res) => {
    const categoriaconceptos = await sequelize.query(`select Id_concepto,nombre_co,m2, Id_cc
    FROM conceptos
    INNER JOIN categoriaconceptos
    ON categoriaconceptos.concepto_id=conceptos.Id_concepto
    WHERE categoriaconceptos.categoria_id = (:id)`,{
        replacements: {id: req.params.id},
        type: QueryTypes.SELECT
    });
    res.json(categoriaconceptos);
};

controller.code = async(req, res) => {
    const clave = await sequelize.query(`SELECT tbl.Id_concepto,tbl.nombre_co,Id_categoria, nombre_ca, Id_cc
    FROM categoria
    inner JOIN categoriaconceptos
    ON categoriaconceptos.categoria_id = categoria.Id_categoria
    INNER JOIN conceptos AS tbl
    on categoriaconceptos.concepto_id=tbl.Id_concepto
    WHERE categoriaconceptos.Id_cc = (:id)`,{
        replacements: {id: req.params.id},
        type: QueryTypes.SELECT
    });

    res.json(clave);
}

module.exports = controller;

/*select Id_cc, categoria_id, concepto_id
FROM categoriaconceptos
INNER JOIN categoria
ON categoriaconceptos.categoria_id=categoria.Id_categoria
WHERE categoriaconceptos.categoria_id = (:id) */