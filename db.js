const { Sequelize } = require('sequelize');

module.exports = new Sequelize (
    "todoList", // Database Name
    "postgres", // Database Admin Name
    "admin", // Database Password
    { 
        dialect: 'postgres',
        host: "localhost",
        port: 5432,
        logging: false
    }
)