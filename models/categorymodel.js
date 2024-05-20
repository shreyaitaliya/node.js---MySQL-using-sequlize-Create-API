const { DataTypes } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;


const DuplicateCategory = require('./duplicatecategoryModel')

module.exports = (Sequelize, DataTypes) => {
    const category = Sequelize.define('category', {
        categoryname: DataTypes.STRING,
    });
    category.belongsTo(Sequelize.models.user);


    return category;
}