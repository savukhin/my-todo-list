const sequelize = require('../../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
})

const Project = sequelize.define('project', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    isFavorite: { type: DataTypes.BOOLEAN, defaultValue: false }
})

const Task = sequelize.define('task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    priority: { type: DataTypes.INTEGER, defaultValue: 0}
})

const Label = sequelize.define('label', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    label: { type: DataTypes.STRING, allowNull: false }
})

User.hasMany(Project)
Project.belongsTo(User)

User.hasMany(Task)
Task.belongsTo(User)

Project.hasMany(Task)
Task.belongsTo(Project)

Task.hasMany(Label)
Label.belongsTo(Task)

module.exports = {
    User,
    Project,
    Task,
}
