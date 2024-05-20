const { DataTypes } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;


module.exports = (sequelize, DataTypes) => {
    const addtocart = sequelize.define('addtocart', {
        subcategoryid: {
            type: DataTypes.INTEGER,
            // primaryKey: true,
            // autoIncrement: true
        },
        subcategoryname: DataTypes.STRING,
        detailssubcategory: DataTypes.STRING,
        pricesubcategory: DataTypes.INTEGER,
    },
        {
            timestamps: false,
        })


    addtocart.belongsTo(sequelize.models.category);
    // addtocart.belongsTo(sequelize.models.subcategory);    
    addtocart.belongsTo(sequelize.models.user);

    return addtocart
}

