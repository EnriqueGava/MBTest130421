const sequelize = require('sequelize');
const db = require('../Config/db');


module.exports =  db.define("persona", {
    User_ID: {
        type: sequelize.STRING,
        primaryKey: true,
    },
    Nombre: {
        type: sequelize.STRING
    },
    Pwd: {
        type: sequelize.STRING
    },
    Role: {
        type: sequelize.STRING
    },
    Perfil: {
        allowNull: true,
        type: sequelize.TEXT
      },
    Apellido: {
        type: sequelize.STRING
    },
    estado: {
        allowNull: true,
        type: sequelize.BOOLEAN
    },
},
    {
        freezeTableName: true
});
