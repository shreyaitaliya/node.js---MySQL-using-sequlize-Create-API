const { DataTypes } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;


module.exports = (sequelize, DataTypes) => {
    const duplicate_sub = sequelize.define('duplicate_subcategory', {
        subcategoryid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        subcategoryname: DataTypes.STRING,
        detailssubcategory: DataTypes.STRING,
        pricesubcategory: DataTypes.INTEGER,
    },
        {
            timestamps: false,
        })


    duplicate_sub.belongsTo(sequelize.models.category);
    // subcategory.belongsTo(sequelize.models.user);

    return duplicate_sub
}

