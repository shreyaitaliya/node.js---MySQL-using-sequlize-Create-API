const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/db');

module.exports = (sequelize, DataTypes) => {
    const DuplicateCategory = sequelize.define('duplicate_category', {
        categoryname: DataTypes.STRING,
    });

    DuplicateCategory.belongsTo(sequelize.models.user);

    return DuplicateCategory;
}