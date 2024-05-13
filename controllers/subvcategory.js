const { DataTypes } = require('sequelize');
const db = require('../config/db');
const sequelize = db.sequelize;

const subcategorymodel = require('../models/subcategorymodel')(sequelize, DataTypes);
const categorymodel = require('../models/categorymodel')(sequelize, DataTypes);

const subcategoryadd = async (req, res) => {
    try {
        let subcate = await subcategorymodel.create({
            subcategoryname: req.body.subcategoryname,
            image: req.file.path,
            categoryId: req.body.categoryId,
        })
        return res.status(200).json({
            success: true,
            message: 'subcategory add successfully',
            subcate
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const subcateview = async (req, res) => {
    try {
        let view = await subcategorymodel.findAll({ include: categorymodel });
        return res.status(200).json({
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch subcategories',
            error: error.message
        });
    }
}

module.exports = ({
    subcategoryadd, subcateview
})