const Mantenimiento = require("../../Model/Estaciones/mantenimiento");
const db = require("../../Config/db");
const bcrypt = require("bcryptjs");
const {QueryTypes} = require("sequelize");
const sequelize = require("../../Config/db");
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const controller = {};
db.sync();

//Firma del Supervisor
controller.firmaMant = async (req,res)=>{
    const key = Buffer.from('419336459035a6d4f8d1a6964e8a0d752fe696d4eba72debdfbc5e22040add95', 'hex');
	 const iv = Buffer.from('6b84e425ee0875a3e203b4ff291b3e06', 'hex');
	  function encrypt(text) {
		  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
		  let encrypted = cipher.update(text);
		  encrypted = Buffer.concat([encrypted, cipher.final()]);
		  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
		 }
		 const hw=encrypt(req.body.data);
		 const Firma = hw.encryptedData;
	  //const SignHash = bcrypt.hashSync(req.body.data, 10);
	  //const Firma = SignHash;
      const id = req.params.id;
      console.log(Firma+" "+id);
      const up = await Mantenimiento.update(
          {firma: Firma},
          {where : {
              id_Mantenimiento: id
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
      const signGet = await Mantenimiento.findAll({ attributes: ['firma'], where: { Username: req.params.id } })
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
        INNER JOIN mantenimiento 
        ON persona.User_ID = mantenimiento.Username
        WHERE persona.User_ID = (:id);`,
        {
          replacements: { id: req.params.id },
          type: QueryTypes.SELECT,
        }
      );
      res.json(dataGet);
    };

module.exports = controller;
