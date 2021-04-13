const Cuadrilla = require("../../Model/Estaciones/cuadrilla");
const db = require("../../Config/db");
const sequelize = require("../../Config/db");
const {QueryTypes} = require("sequelize");
const controller = {};
db.sync();

controller.listcuadrillas = async(req, res) => {
    const listar = await sequelize.query(`SELECT DISTINCT Num_Cuadrilla FROM cuadrilla;`,{
        type: QueryTypes.SELECT
    });
    res.send({success: true, data: listar});
};

controller.oncuadrilla = async(req, res) => {
    await sequelize.query(`SELECT Num_Cuadrilla FROM cuadrilla 
    INNER JOIN responsable
    ON responsable.Cuadrilla_Id=cuadrilla.Id_Cuadrilla
    WHERE User_Id=(:id)`,{
        replacements: {id: req.body.user },
        type: QueryTypes.SELECT
    })
    .then(result => {
        res.send({success: true, data: result});
    })
}

controller.partners = async(req, res) => {
    await sequelize.query(`SELECT nombre,apellido,persona.User_ID, cuadrilla.Id_Cuadrilla FROM persona
    INNER JOIN cuadrilla 
    ON cuadrilla.User_Id=persona.User_ID
    WHERE cuadrilla.Num_Cuadrilla=(:id)
    EXCEPT
    SELECT nombre,apellido,persona.User_ID, cuadrilla.Id_Cuadrilla FROM persona
    INNER JOIN cuadrilla
    ON cuadrilla.User_Id=persona.User_ID
    INNER JOIN responsable
    ON responsable.Cuadrilla_Id=cuadrilla.Id_Cuadrilla;`, {
            replacements: {id: req.body.id },
            type: QueryTypes.SELECT
    })
    .then(result => {
        res.send({success: true, data: result});
    })
}

controller.listintegrantes = async(req,res) => {
    await sequelize.query(`SELECT nombre,apellido,persona.User_ID FROM persona
    INNER JOIN cuadrilla 
    ON cuadrilla.User_Id=persona.User_ID
    WHERE cuadrilla.Num_Cuadrilla=(SELECT Num_Cuadrilla FROM cuadrilla 
    INNER JOIN responsable
    ON responsable.Cuadrilla_Id=cuadrilla.Id_Cuadrilla
    WHERE User_Id=(:id))
    EXCEPT
    SELECT nombre,apellido,persona.User_ID FROM persona
    INNER JOIN cuadrilla
    ON cuadrilla.User_Id=persona.User_ID
    INNER JOIN responsable
    ON responsable.Cuadrilla_Id=cuadrilla.Id_Cuadrilla;`,{
        replacements: {id: req.body.user},
        type: QueryTypes.SELECT
    })
    .then(result => {
        res.send({success: true, data: result});
    })
}

controller.insert = async(req, res) => {
    const insert = await Cuadrilla.update(
        {Num_Cuadrilla: req.body.cuadrilla},
        {where: {
            User_Id: req.body.email
        }}
    )
    .then(result => {
        res.send({success: true, data: result});
    })
    .catch(err => {
        res.send({success: false, data: err});
    })
    
}

//Listar solicitudes de trabajo solo que le correspondan al jefe de cuadrilla
controller.liststrabajo = async(req,res) => {
    await sequelize.query(` SELECT strabajo.NumST,strabajo.NumSA,strabajo.Fecha_Inicio,strabajo.Fecha_Fin FROM persona
    INNER JOIN cuadrilla
    ON cuadrilla.User_Id=persona.User_ID
    INNER JOIN responsable
    ON responsable.Cuadrilla_Id=cuadrilla.Id_Cuadrilla
    INNER JOIN strabajo
    ON strabajo.Id_responsable=responsable.Id_Responsable
    WHERE persona.User_ID=(:id);`,{
        replacements: {id: req.body.user},
        type: QueryTypes.SELECT
    })
    .then(result => {
        res.send({success: true, data: result});
    })
}

//Listar herramientas, materiales y informacion del vehiculo 
controller.listmaterialyvehiculo = async(req,res) => {
    await sequelize.query(` SELECT inventario.codigo,producto, Cantidad.Cantidad,inventario.Tipo,
    Vehiculo.Marca,Vehiculo.Modelo,Vehiculo.Kilometraje, Vehiculo.Placa ,strabajo.NumST,strabajo.NumSA,strabajo.NumOrden,
    re.NombreP, re.ApellidoP FROM strabajo
    INNER JOIN Cantidad
    ON Cantidad.NumSA=strabajo.NumSA
    INNER JOIN inventario
    ON inventario.Codigo=Cantidad.Codigo
    INNER JOIN Vehiculo
    ON Vehiculo.Placa=strabajo.Placa,
    (SELECT persona.Nombre AS NombreP,persona.Apellido AS ApellidoP FROM strabajo
        INNER JOIN cuadrilla
    ON cuadrilla.Id_Cuadrilla=strabajo.Id_phartner
    INNER JOIN persona
    ON persona.User_ID=cuadrilla.User_Id
    WHERE strabajo.NumST=(:id))AS re
    WHERE strabajo.NumST=(:id);`,{
        replacements: {id: req.body.strabajo},
        type: QueryTypes.SELECT
    })
    .then(result => {
        res.send({success: true, data: result});
    })
}

module.exports = controller;