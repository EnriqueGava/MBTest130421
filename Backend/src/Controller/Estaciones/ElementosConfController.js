const ElemCo = require("../../Model/Estaciones/elementosconformados");
const db = require("../../Config/db");
const controller = {};
const { QueryTypes } = require("sequelize");
const sequelize = require("../../Config/db");
db.sync();

controller.list = async (req, res) => {
	const dataGet = await sequelize.query(`select categoriaconceptos.Id_cc,
			Id_concepto,nombre_co,Id_categoria,nombre_ca,Id_partes,nombre_pa,Id_Falla,falla.falla, Id_elemento, tramo, imagen,
			imagenf
			FROM falla  
			INNER JOIN ccpartes
			ON ccpartes.Id_ccp=falla.Id_ccp
			INNER JOIN partes
			ON partes.Id_partes = ccpartes.Id_Part
            INNER JOIN categoriaconceptos
            ON categoriaconceptos.Id_cc=ccpartes.Id_cc
            INNER JOIN categoria
            ON categoria.Id_categoria=categoriaconceptos.categoria_id
            INNER JOIN conceptos
            ON conceptos.Id_concepto=categoriaconceptos.concepto_id
            INNER JOIN elementosconformados
            ON elementosconformados.falla_id=falla.Id_Falla
			WHERE elementosconformados.orden_id = (:id)`, {
		replacements: { id: req.params.id },
		type: QueryTypes.SELECT
	});
	res.json(dataGet);
};

controller.estline = async (req, res) => {
	const el_get = await sequelize.query(`SELECT Id_linea, nombre_li, nombre_es
			FROM elementosconformados  
            INNER JOIN elsentidos
            ON elementosconformados.els_id=elsentidos.id_els
            INNER JOIN estacioneslineas
            ON elsentidos.el_id=estacioneslineas.Id_el
            INNER JOIN estaciones
            ON estacioneslineas.estacion_id= estaciones.Id_estacion
            INNER JOIN lineas
            ON estacioneslineas.linea_id= lineas.Id_linea
			WHERE elementosconformados.orden_id = (:id)`, {
		replacements: { id: req.params.id },
		type: QueryTypes.SELECT
	});
	res.json(el_get);
};

controller.imageArray = async (req, res) => {
	const imageGet = await ElemCo.findAll({ attributes: ['imagen'], where: { Id_elemento: req.params.id } })
		.then(rows => {
			return rows;
		})
		.catch(err => {

		})
	res.json(imageGet);

};
controller.imageArrayF = async (req, res) => {
	const imageGet = await ElemCo.findAll({ attributes: ['imagenf'], where: { Id_elemento: req.params.id } })
		.then(rows => {
			return rows;
		})
		.catch(err => {

		})
	res.json(imageGet);

};
controller.prueba =async (req, res) => {
	
}
controller.upload = async (req, res) => {
	
	const datos = {
		els_id: 0,
		orden_id: 0,
		falla_id: 0,
		imagen: "",
		tramo: "",
		area: 0.0
	};
	if(req.body.tramo)
		datos.tramo=req.body.tramo;
	if(req.body.area)
		datos.area=req.body.area;
		 
	datos.els_id = parseInt(req.body.els_id, 10);
	datos.orden_id = parseInt(req.body.orden_id, 10);
	datos.falla_id = parseInt(req.body.falla_id, 10);
	datos.imagen = req.body.imagen;
	console.log(req.body);
	const dataSet = await ElemCo.create(
		{
			els_id: datos.els_id,
			orden_id: datos.orden_id,
			falla_id: datos.falla_id,
			imagen: datos.imagen,
			tramo: datos.tramo,
			area: datos.area

		})
		.then(data => {
			return data;
		})
		.catch(err => {
			return err;
		})
	console.log(dataSet);
	res.json(dataSet);
};

controller.test = async (req, res) => {
	const error = true;
	var img = "";
	for(i=0; i<req.body.imagenes.length; i++) {
		if(i!=0)
			img += ",";
		img += req.body.imagenes[i].replace(/[']/g,'');

	}
	const el_get = await sequelize.query(`UPDATE elementosconformados 
	SET imagenf=:imagen
	WHERE Id_elemento= (:id)`, {
		replacements: { id: req.body.id,imagen: img },
		type: QueryTypes.UPDATE
	}).then(result => {
		res.send({success: true, data: result})
	})
	.catch(err => {
		console.log("erros: "+err);
	});
	
		
};
controller.uploadImgMant = async (req, res) => {
	console.log(req.body);
	const uploadImgs = await ElemCo.update(
		{ imagenf: req.body.imagenes}, { where: { Id_elemento: req.body.id } })
	.then(result => {
		console.log(result);
		res.send({success: true, data: result})
	})
	.catch(err => {
		res.send({success: false, data: err})
	})
};

controller.find = async (req, res) => {
	const registro = await ElemCo.findAll({
		where: { Id_numorden: req.params.id }
	})
		.then(rows => {
			return rows;
		})
		.catch(err => {
			return err;
		})
	res.json(registro);
}

controller.unsave = async (req, res) => {
	const lineaestacion = await sequelize.query(`select Id_linea,Id_estacion
	from elementosconformados
	inner join elsentidos
	on elsentidos.id_els = elementosconformados.els_id
	inner join sentidos
	on sentidos.Id_sentido = elsentidos.sentido_id
	inner join estacioneslineas
	on estacioneslineas.id_el = elsentidos.el_id
	inner join estaciones
	on estaciones.Id_estacion = estacioneslineas.estacion_id
	inner join lineas
	on lineas.Id_linea = estacioneslineas.linea_id
	where elementosconformados.orden_id= (:id)`, {
		replacements: { id: req.params.id },
		type: QueryTypes.SELECT
	});
	res.json(lineaestacion);
}

controller.deleteElemento = async( req, res) =>{
    const Id_elemento = req.params.id;
    await ElemCo.destroy(
        {
            where:{Id_elemento:Id_elemento}
        }
    )
    .then(()=>{
        res.json({success:true});
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })
};


module.exports = controller;