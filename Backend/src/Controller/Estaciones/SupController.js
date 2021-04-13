const Sup = require("../../Model/Estaciones/supervisor");
const db = require("../../Config/db");
const {QueryTypes} = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../../Config/db");
const controller = {};
db.sync();

//Firma del Supervisor
controller.firmaSup = async (req,res)=>{
  const SignHash = bcrypt.hashSync(req.body.data, 10);
  const Firma = SignHash;
    const id = req.params.id;
    console.log(Firma+" "+id);
    const up = await Sup.update(
        {firma: Firma},
        {where : {
            Supervisor_Id: id
        }
    })
    .then((rows )=>{
        return rows;
    })
    .catch(err=>{
        res.json({success:false, message:err});
    })

    res.json(up);
}

controller.checkFirma = async (req, res) => {
	const signGet = await Sup.findAll({ attributes: ['firma'], where: { Supervisor_Id: req.params.id } })
		.then(rows => {
			return rows;
		})
		.catch(err => {

		})
	res.json(signGet);

};

controller.getData = async (req, res) => {
    const dataGet = await sequelize.query(
      `
      SELECT * FROM persona
      INNER JOIN supervisor 
      ON persona.User_ID = supervisor.Username
      WHERE persona.User_ID = (:id);`,
      {
        replacements: { id: req.params.id },
        type: QueryTypes.SELECT,
      }
    );
    res.json(dataGet);
  };

module.exports = controller;