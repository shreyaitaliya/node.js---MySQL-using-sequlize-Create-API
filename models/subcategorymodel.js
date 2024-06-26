const { DataTypes } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;


module.exports = (sequelize, DataTypes) => {
    const subcategory = sequelize.define('subcategory', {
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


    subcategory.belongsTo(sequelize.models.category);
    // subcategory.belongsTo(sequelize.models.user);

    return subcategory
}

