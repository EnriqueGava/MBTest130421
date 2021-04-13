const Sentidos = require("../../Model/Estaciones/sentidos");
const db = require("../../Config/db");
const strabajo = require("../../Model/Estaciones/strabajo");
const controller = {};
const {QueryTypes} = require("sequelize");
const sequelize = require("../../Config/db");
db.sync();

controller.listst = async(req, res) => {
    await sequelize.query(`SELECT strabajo.NumST "ST",strabajo.NumSA "SA",strabajo.NumOrden "NumO", strabajo.firmaJud,cuadrilla.Num_Cuadrilla 
    "NumCua",persona.nombre, persona.apellido,elementosconformados.imagen, Vehiculo.Marca,Vehiculo.Modelo,Vehiculo.Kilometraje, Vehiculo.Placa
    ,re.NombreP,re.ApellidoP FROM persona
        INNER JOIN cuadrilla
        ON cuadrilla.User_Id=persona.User_ID
        INNER JOIN responsable
        ON responsable.Cuadrilla_Id=cuadrilla.Id_Cuadrilla
        INNER JOIN strabajo
        ON strabajo.Id_responsable=responsable.Id_Responsable
		INNER JOIN Vehiculo
		ON Vehiculo.Placa=strabajo.Placa
        INNER JOIN elementosconformados
        ON elementosconformados.orden_id=strabajo.NumOrden,
        (SELECT persona.Nombre AS NombreP,persona.Apellido AS ApellidoP FROM strabajo 
        INNER JOIN cuadrilla
        ON cuadrilla.Id_Cuadrilla=strabajo.Id_phartner
        INNER JOIN persona
        ON persona.User_ID=cuadrilla.User_Id
        WHERE strabajo.NumST=(:id))AS re
        WHERE strabajo.NumST=(:id);`,{
        replacements: {id: req.body.id},
        type: QueryTypes.SELECT
    })
    .then(result => {
        res.send({success: true, data: result});
    })
    .catch(err => {
        console.log("error => "+err);
    })
}
controller.listmat = async(req, res) => {
    await sequelize.query(`SELECT inventario.codigo,producto, Cantidad.Cantidad FROM inventario
    INNER JOIN Cantidad
    ON Cantidad.Codigo=inventario.Codigo
    INNER JOIN salmacen
    ON salmacen.NumSA= Cantidad.NumSA
    WHERE Cantidad.NumSA=(:id);`,{
        replacements: {id: req.body.id},
        type: QueryTypes.SELECT
    })
    .then(result => {
        res.send({success: true, data: result});
    })
}

controller.listST = async (_, res) => {
    await sequelize.query(
        `
        SELECT NumST,NumSA,fecha_inicio,fecha_fin,firmaJud FROM strabajo`,
        {
            type: QueryTypes.SELECT,
        }
    )
        .then(result => {
            res.send({ success: true, data: result });
        })
        .catch(err => {
            res.send({ success: false, data: err });
        })
}

controller.actualizarFecha = async (req, res) => {
	const el_get = await sequelize.query(`UPDATE strabajo 
	SET Fecha_Fin=:fecha
	WHERE NumST= (:id)`, {
		replacements: { id: req.body.id,fecha: new Date() },
		type: QueryTypes.UPDATE
	}).then(result => {
		res.send({success: true, data: result})
	})
	.catch(err => {
        res.send({success: true, data: result})
		console.log("erros: "+err);
	});
	
		
};

controller.signjud = async (req, res) => {
    const firma = req.params.valor;
    const id = req.params.id;
    console.log(firma + " " + id);
    const upj = await strabajo.update(
        { firmaJud: firma },
        {
            where: {
                NumST: id
            }
        })
        .then((rows) => {
            return rows;
        })
        .catch(err => {
            res.json({ success: false, message: err });
        })

    res.json(upj);
}
module.exports = controller;
