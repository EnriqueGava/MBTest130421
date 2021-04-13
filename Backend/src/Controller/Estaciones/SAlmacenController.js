const SAlmacen = require('../../Model/Estaciones/salmacen');
const STrabajo = require('../../Model/Estaciones/strabajo');
const Mantenimiento = require('../../Model/Estaciones/mantenimiento');
const Cantidad = require('../../Model/Estaciones/cantidad');
const db = require("../../Config/db");
const sequelize = require("../../Config/db");
const {QueryTypes} = require("sequelize");
const controller = {};
db.sync();
controller.insert = async (req, res) => {
    let cantidades = [];
    const success  = [];
    const MPerson = await Mantenimiento.findAll({
        raw: true,
        where: {Username: req.body.User_ID.user}
    }).then((user) => {
        return user;
    });
    const SAl = await SAlmacen.create({
        Firma_EMantenimiento: MPerson[0].Id_Mantenimiento,
        Fecha_Entrega: null, 
        Fecha_Devolu: null,
        Observaciones: req.body.observaciones
    })
    .then(result => {
        success[0] = true;
        return result;
    })
    .catch(err => {
        success[0] = false;
        return err;
    });
    const ST = await STrabajo.create({
        NumSA: SAl.NumSA,
        NumOrden: req.body.levantamiento,
        Id_responsable: req.body.cuadrilla,
        Id_phartner: req.body.partners,
        Placa: req.body.vehiculo,
        Observaciones: req.body.observaciones,
        Fecha_Inicio: req.body.Fecha
    })
    .then(result => {
        success[1] = true
        return result;
    })
    .catch(err => {
        success[1] = false;
        return err;
    });

    if(req.body.herramienta.length > 0 )
        req.body.herramienta.map(item => {
            cantidades.push({
                Cantidad:  item.cantidad,
                Codigo: item.codigo, 
                NumSA: SAl.NumSA
            })
        });
    
    if(req.body.material.length > 0)
        req.body.material.map(item => {
            cantidades.push({
                Cantidad: item.cantidad,
                Codigo: item.codigo, 
                NumSA: SAl.NumSA
            })
        });
    const Cantidades = await Cantidad.bulkCreate(cantidades)
    .then((result) => {
        success[2] = true;
        return result;
    })
    .catch((err) => {
        success[2] = false;
        return err;
    });

    console.log(ST);
    res.send({success: success, SAlmacen: SAl, STrabajo: ST, Cantidades: Cantidades});
};

controller.getdate = async(req, res) => {
    var fecha= null;
    fecha = await sequelize.query(`SELECT CURDATE();`,{
        type: QueryTypes.SELECT
    });
    res.send({success: true, data: fecha});
};

controller.getSA = async(req, res) => {
    var fecha= null;
    fecha = await sequelize.query(`SELECT NumSA,Fecha_inicio,Fecha_Fin from strabajo WHERE Fecha_inicio IS NOT NULL AND Fecha_Fin IS NOT NULL;`,{
        type: QueryTypes.SELECT
    });
    res.send({success: true, data: fecha});
};

controller.devolucion = async(req, res) => {
    var fecha= null;
    fecha = await sequelize.query(`UPDATE salmacen SET Fecha_Devolu = :fecha where NumSA = :id`,{
        replacements : { 
            fecha : new Date(), 
            id: req.body.codd
        },
        type: QueryTypes.UPDATE
    })
        .then(result => {
            res.send({ success: true, data: result});
        })
        .catch(err => {
            res.send({ success: false, data: err});
        })
    
}

controller.fecha_d = async(req, res) => {
    await SAlmacen.findAll({where : {NumSA : req.params.num}})
    .then(result => {
        res.send({ success: true, data: result[0].Fecha_Devolu});
    })
    .catch(err => {
        res.send({ success: false, data: err});
    })
}
module.exports = controller;
