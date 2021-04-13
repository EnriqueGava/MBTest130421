const Inventario = require("../../Model/Estaciones/inventario");
const db = require("../../Config/db");
const sequelize = require("../../Config/db");
const { QueryTypes } = require("sequelize");
const controller = {};
db.sync();

controller.listHerramienta = async (_, res) => {
    await Inventario.findAll({
        where: { Tipo: 1 }
    })
        .then(result => {
            res.send({ success: true, data: result });
        })
        .catch(err => {
            res.send({ success: true, data: err });
        })
};
controller.list = async (req, res) => {
    const listar = await sequelize.query(`SELECT *FROM inventario;`, {
        type: QueryTypes.SELECT
    });
    res.send({ success: true, data: listar });
};


controller.listMaterial = async (_, res) => {
    await Inventario.findAll({
        where: { Tipo: 0 }
    })
        .then(result => {
            res.send({ success: true, data: result });
        })
        .catch(err => {
            res.send({ success: true, data: err });
        })
};

controller.Apartar = async (req, res) => {
    const quitar = await sequelize.query(`
        CALL quitar(:cantidad,:codigo)`, {
        replacements: {
            cantidad: req.body.Cantidad,
            codigo: req.body.Codigo
        },

    })
        .then(result => {
            res.send({ success: true, data: result })
        })
        .catch(err => {
            res.send({ success: false, data: err });
        });

}

controller.Devolver = async (req, res) => {
    const devolver = await sequelize.query(`
        CALL agregar(:cantidad,:codigo)`, {
        replacements: {
            cantidad: req.body.Cantidad,
            codigo: req.body.Codigo
        },

    })
        .then(result => {
            res.send({ success: true, data: result })
        })
        .catch(err => {
            res.send({ success: false, data: err });
        });

}

controller.Devoluciones = async (req, res) => {

    console.log(req.body.devol)
    var data = [];
    for (i = 0; i < req.body.devol.length; i++) {
        await sequelize.query(`
        CALL agregar(:cantidad,:codigo)`, {
            replacements: {
                cantidad: req.body.devol[i].cantidad,
                codigo: req.body.devol[i].id
            },

        })
            .then(result => {
                data.push({ success: true, data: result })
            })
            .catch(err => {
                data.push({ success: false, data: err });
            });

    }

    res.send(data);



}

controller.AddInventario = async (req, res) => {
    const agregarinventario = await sequelize.query(`
        CALL agregarh(:medida,:producto,:partida,:existencia,:tipo)`, {
        replacements: {
            medida: req.body.Medida,
            producto: req.body.Producto,
            partida: req.body.Partida,
            existencia: req.body.Existencia,
            tipo: req.body.Tipo,
        },

    })
        .then(result => {
            res.send({ success: true, data: result })
        })
        .catch(err => {
            res.send({ success: false, data: err });
        });

}

controller.Cerrar = async (req, res) => {

    const prueba = await req.body.Datos.map(item => {
        console.log(item.codigo + " " + item.cantidad);
    })
        .then(result => {
            res.send({ success: true, data: result });
        })
};

controller.EditH = async (req, res) => {
    const editarinventario = await sequelize.query(`
        CALL actualizarh(:codigo,:medida,:producto,:partida,:existencia,:tipo)`, {
        replacements: {
            codigo: req.body.Codigo,
            medida: req.body.Medida,
            producto: req.body.Producto,
            partida: req.body.Partida,
            existencia: req.body.Existencia,
            tipo: req.body.Tipo,
        },

    })
        .then(result => {
            res.send({ success: true, data: result })
        })
        .catch(err => {
            res.send({ success: false, data: err });
        });

}

module.exports = controller;
