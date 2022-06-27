const { Sequelize } = require('sequelize');

module.exports = new Sequelize (
    "todoList",
    "postgres",
    "admin",
    { 
        dialect: 'postgres',
        host: "localhost",
        port: 5432,
        logging: false
    }
)