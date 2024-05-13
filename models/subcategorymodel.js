
module.exports = (sequelize, DataTypes) => {
    const subcategory = sequelize.define('subcategory', {
        subcategoryname: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        timestamps: false,
    })
    subcategory.belongsTo(sequelize.models.category);

    return subcategory
}       