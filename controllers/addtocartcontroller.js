const { DataTypes, where } = require("sequelize");
const db = require("../config/db");
const sequelize = db.sequelize;

const subcategorymodel = require("../models/subcategorymodel")(sequelize, DataTypes);
const addtocartmodel = require("../models/addtocartmodel")(sequelize, DataTypes);


const addtocartadd = async (req, res) => {
    try {
        const subcategoryid = req.body.subcategoryid;
        // console.log(subcategoryid);
        const product = await subcategorymodel.findOne({ where: { subcategoryid: subcategoryid } });

        const cart = await addtocartmodel.create({
            subcategoryid: product.subcategoryid,
            subcategoryname: product.subcategoryname,
            detailssubcategory: product.detailssubcategory,
            pricesubcategory: product.pricesubcategory,
            categoryId: product.categoryId,
            userId: req.body.userId
        })

        return res.status(200).json({
            success: true,
            message: 'add to cart add sucessfully',
            cart,
        })

    } catch (error) {
        console.log(error);
        return false;
    }
}

const addtocartview = async (req, res) => {
    try {

        console.log(req.user);
        const user = req.user;
        const userId = req.user.loginuser.id;

        console.log(userId);

        const addtocartview = await addtocartmodel.findAll({ where: { userId: userId } });

        let totalPrice = 0;
        addtocartview.forEach(product => {
            totalPrice += product.pricesubcategory;
        });

        // const totalPrice = addtocartview.reduce((acc, product) =>
        //     acc + product.pricesubcategory, 0
        // );


        return res.status(200).json({
            success: true,
            message: 'add to cart view sucessfully',
            totalItems: addtocartview.length,
            totalPrice: totalPrice,
            addtocartview,

        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    addtocartadd, addtocartview
})