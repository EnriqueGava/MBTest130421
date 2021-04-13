const Sequelize = require("sequelize");

const sequelize = new Sequelize("mbv6", "admin", "root1234", {
    host: "d357.cuknxnysfure.us-east-2.rds.amazonaws.com",
    dialect: "mariadb",
    port: "2813",
    // operatorsAliases: false,
    define: {
        timestamps: false,
    },
});

module.exports = sequelize;