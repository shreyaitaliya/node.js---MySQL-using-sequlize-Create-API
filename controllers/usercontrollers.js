const { DataTypes, Op, where } = require('sequelize');
const db = require('../config/db');

const sequelize = db.sequelize

const usermodel = require('../models/usermodel')(sequelize, DataTypes);
const jwt = require('jsonwebtoken');
const categorymodel = require('../models/categorymodel')(sequelize, DataTypes);

const adduser = async (req, res) => {
    try {
        //duplicate can not added
        const duplicate = await usermodel.findOne({
            where: {
                [Op.or]: {
                    name: req.body.name,
                    email: req.body.email,
                }
            }
        })
        if (duplicate) {
            return res.status(400).send({
                success: false,
                message: 'User Already Added'
            })
        }

        const createuser = await usermodel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        return res.status(200).send({
            sucess: true,
            message: 'data added sucessfully',
            createuser
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const loginuser = await usermodel.findOne({
            where: { email, password }
        })
        if (!loginuser) {
            return res.status(400).send({
                success: false,
                message: 'email and password are not correct'
            })
        }
        let token = await jwt.sign({ loginuser: loginuser }, 'API', { expiresIn: '1hr' });
        return res.status(200).send({
            success: true,
            message: 'token is here...',
            token
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

const profileinfo = async (req, res) => {
    try {
        // return res.json(req.user);
        const user = req.user.loginuser;
        // const category = await categorymodel.findAll({
        //     where: {
        //         userId: user.category
        //     }
        // });
        return res.status(200).send({
            success: true,
            message: 'user can show sucessfully',
            user, category
        })
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = ({
    adduser, login, profileinfo
})