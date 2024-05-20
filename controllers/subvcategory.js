const { DataTypes } = require('sequelize');
const db = require('../config/db');
const sequelize = db.sequelize;

const subcategorymodel = require('../models/subcategorymodel')(sequelize, DataTypes);
const categorymodel = require('../models/categorymodel')(sequelize, DataTypes);
const duplicatesubcategorymodel = require('../models/duplicatesubcategorymodels')(sequelize, DataTypes);

const subcategoryadd = async (req, res) => {
    try {
        let subcate = await subcategorymodel.create({
            subcategoryid: Math.floor(Math.random() * 1000),
            subcategoryname: req.body.subcategoryname,
            detailssubcategory: req.body.detailssubcategory,
            pricesubcategory: req.body.pricesubcategory,
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
        let view = await subcategorymodel.findAll({});
        return res.status(200).json({
            success: true,
            message: 'subcategoryview sucessfully',
            view
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

const deletesubcategory = async (req, res) => {
    try {
        let subcategoryid = req.body.subcategoryid;

        const subcategorydelete = await subcategorymodel.findByPk(subcategoryid);
        if (!subcategorydelete) {
            return res.status(400).json({
                success: false,
                message: 'subcategory not found',
            })
        }

        const duplicatesubcategory = await duplicatesubcategorymodel.create({
            subcategoryid: subcategorydelete.subcategoryid,
            subcategoryname: subcategorydelete.subcategoryname,
            detailssubcategory: subcategorydelete.detailssubcategory,
            pricesubcategory: subcategorydelete.pricesubcategory,
            categoryId: subcategorydelete.categoryId
        })

        await subcategorydelete.destroy();

        return res.status(200).json({
            success: true,
            message: 'category delete sucessfullyy and add duplicatecategory',
            duplicatesubcategory,
            subcategorydelete
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

const editsubcategory = async (req, res) => {
    try {
        const subcategoryid = req.body.subcategoryid;
        const new_subcategoryname = req.body.subcategoryname;
        const new_detailssubcategory = req.body.detailssubcategory;
        const new_pricesubcategory = req.body.pricesubcategory;

        const subcategortToUpdate = await subcategorymodel.findByPk(subcategoryid);
        if (!subcategortToUpdate) {
            return res.status(400).json({
                success: false,
                message: 'subcategory not found',
            })
        }

        //duplicate subcategory
        const duplicate_subcategory = await duplicatesubcategorymodel.create({
            subcategoryid: subcategortToUpdate.subcategoryid,
            subcategoryname: subcategortToUpdate.subcategoryname,
            detailssubcategory: subcategortToUpdate.detailssubcategory,
            pricesubcategory: subcategortToUpdate.pricesubcategory,
            categoryId: subcategortToUpdate.categoryId,
        })

        //update the subcategoryname
        subcategortToUpdate.subcategoryname = new_subcategoryname;
        subcategortToUpdate.detailssubcategory = new_detailssubcategory;
        subcategortToUpdate.pricesubcategory = new_pricesubcategory;
        await subcategortToUpdate.save();

        return res.status(200).json({
            success: true,
            message: 'category updated sucessfully',
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    subcategoryadd, subcateview, deletesubcategory, editsubcategory
})