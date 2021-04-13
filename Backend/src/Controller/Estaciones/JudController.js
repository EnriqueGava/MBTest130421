const Jud = require("../../Model/Estaciones/jud");
const db = require("../../Config/db");
const { QueryTypes } = require("sequelize");
const bcrypt = require("bcryptjs");
const sequelize = require("../../Config/db");
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const controller = {};
db.sync();

//Firma del Jud
controller.firmaJud = async (req, res) => {
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
  console.log(Firma + " " + id);
  const up = await Jud.update(
    { firma: Firma },
    {
      where: {
        Id_Jud: id,
      },
    }
  )
    .then((rows) => {
      return rows;
    })
    .catch((err) => {
      res.json({ success: false, message: err });
    });

  res.json(up);
};

controller.checkFirma = async (req, res) => {
  console.log("checando...");
  const signGet = await Jud.findAll({
    attributes: ["firma"],
    where: { Id_Jud: req.params.id },
  })
    .then((rows) => {
      return rows;
    })
    .catch((err) => {});
  res.json(signGet);
};

controller.getData = async (req, res) => {
  const dataGet = await sequelize.query(
    `
    SELECT * FROM persona
    INNER JOIN jud 
    ON persona.User_ID = jud.Username
    WHERE persona.User_ID = (:id);`,
    {
      replacements: { id: req.params.id },
      type: QueryTypes.SELECT,
    }
  );
  res.json(dataGet);
};

module.exports = controller;
