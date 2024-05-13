const { DataTypes, where } = require('sequelize');
const db = require('../config/db');
const sequelize = db.sequelize

const categorymodel = require('../models/categorymodel')(sequelize, DataTypes);
const duplicatecategorymodel = require('../models/duplicatecategoryModel')(sequelize, DataTypes);

const categoryadd = async (req, res) => {
    console.log(req.user);
    try {
        const category = await categorymodel.create({
            categoryname: req.body.categoryname,
            userId: req.user.loginuser.id,
        })
        return res.status(200).json({
            sucess: true,
            message: 'category added sucessfully',
            category
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const categoryview = async (req, res) => {
    try {
        let viewcategory = await categorymodel.findAll({});
        return res.status(200).send({
            status: true,
            message: 'category view sucessfully',
            viewcategory
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const categorydelete = async (req, res) => {
    try {
        const categoryId = req.body.categoryid;

        // Find the category to be deleted
        const categoryToDelete = await categorymodel.findByPk(categoryId);
        if (!categoryToDelete) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        const duplicatedata = await duplicatecategorymodel.create({
            categoryname: categoryToDelete.categoryname,
            userId: categoryToDelete.userId

        });

        await categoryToDelete.destroy();

        return res.status(200).json({
            success: true,
            message: 'Category deleted and moved to duplicate category successfully',
            duplicatedata,
            deletedCategory: categoryToDelete
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const categoryupdate = async (req, res) => {
    try {
        const categoryId = req.body.categoryid;
        const newCategoryName = req.body.categoryname;

        const categoryToUpdate = await categorymodel.findByPk(categoryId);

        if (!categoryToUpdate) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        // Create a duplicate the old category name
        const duplicatedata = await duplicatecategorymodel.create({
            categoryname: categoryToUpdate.categoryname,
            userId: categoryToUpdate.userId
        });

        // Update the category name
        categoryToUpdate.categoryname = newCategoryName;
        await categoryToUpdate.save();

        return res.status(200).json({
            success: true,
            message: 'Category updated successfully',
            newCategoryName,
            duplicatedata
        });

    } catch (error) {
        console.error('Error updating category:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = ({
    categoryadd, categoryview, categorydelete, categoryupdate
})
