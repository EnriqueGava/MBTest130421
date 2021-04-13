const Levantamientos = require("../../Model/Estaciones/levantamientos");
const db = require("../../Config/db");
const { QueryTypes } = require("sequelize");
const sequelize = require("../../Config/db");
const datetime = require("node-datetime");
const Op = require('sequelize').Op;
const controller = {};
db.sync();
//Listar por persona
controller.list = async (req, res) => {
    const levantamientos = await Levantamientos.findAll({
        where: {
            Id_User: req.params.id,
            Generado: 1
        }
    })
        .then(rows => {
            return rows;
        })
    res.send(levantamientos);
};

//Listar todos los levantamientos

controller.listar = async (req, res) => {
    const levantas = await Levantamientos.findAll()
        .then(res => {
            return res;
        })
        .catch(row => {
            return row;
        })

    res.send(levantas);
}

//Crear
controller.nuevo = async (req, res) => {
    console.log(req.body);
    const dataSet = await Levantamientos.create({
        Id_User: req.body.Id_User,
        estado: req.body.estado,
        Fecha: new Date(),
        Generado: req.body.Generado
    })
        .then(data => {
            return data;
        })
        .catch(err => {
            return err;
        })
    console.log(dataSet);
    res.json(dataSet);
}

//Borrar levantamiento
controller.borrar = async (req, res) => {
    const Id_numorden = req.params.id;
    await Levantamientos.destroy({
        where: {
            Id_numorden: Id_numorden
        }
    })
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            res.json({ success: false, message: err });
        })
}

//Terminar levantamiento
controller.terminar = async (req, res) => {
    const Generar = req.params.valor;
    const id = req.params.id;
    console.log(Generar + " " + id);
    const up = await Levantamientos.update(
        { Generado: Generar },
        {
            where: {
                Id_numorden: id
            }
        })
        .then((rows) => {
            return rows;
        })
        .catch(err => {
            res.json({ success: false, message: err });
        })

    res.json(up);
}

controller.signjud = async (req, res) => {
    const firma = req.params.valor;
    const id = req.params.id;
    console.log(firma + " " + id);
    const upj = await Levantamientos.update(
        { firmaJud: firma },
        {
            where: {
                Id_numorden: id
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

controller.signsup = async (req, res) => {
    const firma = req.params.valor;
    const id = req.params.id;
    console.log(firma + " " + id);
    const ups = await Levantamientos.update(
        { firmasup: firma },
        {
            where: {
                Id_numorden: id
            }
        })
        .then((rows) => {
            return rows;
        })
        .catch(err => {
            res.json({ success: false, message: err });
        })

    res.json(ups);
}

controller.listarun = async (req, res) => {
    const listar = await Levantamientos.findAll({
        where: {
            Id_User: req.params.id,
            Generado: 0
        }

    })
        .then(rows => {
            return rows;
        })
        .catch(err => {
            return err;
        })

    res.json(listar);
}

controller.listMantenimiento = async (_, res) => {
    await sequelize.query(
        `
        SELECT Id_numorden,Fecha FROM levantamientos
WHERE firmajud IS NOT NULL AND firmasup IS NOT NULL 
EXCEPT
SELECT Id_numorden,Fecha FROM levantamientos
INNER JOIN strabajo
ON strabajo.NumOrden=levantamientos.Id_numorden`,
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

/*
SELECT Id_numorden,Fecha, firmaJud, firmasup, estado
    FROM levantamientos
    where Id_User = 'levantamiento@metrobus.com.mx' 
*/
module.exports = controller;