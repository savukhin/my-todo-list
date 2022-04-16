const sequelize = require('../../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    isFavorite: {type: DataTypes.BOOLEAN}
})

const Task = sequelize.define('task', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING},
    completed: {type: DataTypes.BOOLEAN}
})

User.hasMany(Project)
Project.belongsTo(User)

User.hasMany(Task)
Task.belongsTo(User)

Project.hasMany(Task)
Task.belongsTo(Project)

module.exports = {
    User,
    Project,
    Task,
}
