const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("chat", "root", "zyx852741", {
    host: "localhost",
    dialect: "mysql",
    logging(msg) {
    }
});

module.exports = sequelize;