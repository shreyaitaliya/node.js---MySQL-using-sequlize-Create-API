const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sequlizeapi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

sequelize.authenticate()
    .then(() => {
        console.log('connected');
    }).catch((error) => {
        console.log(error);
    })

const db = {};
db.sequelize = sequelize;
db.sequelize = sequelize;

db.sequelize.sync({}).then(() => {
    console.log('yes re-sync');
})

const usermodel = require('../models/usermodel')(sequelize, DataTypes);
const categorymodel = require('../models/categorymodel')(sequelize, DataTypes);
const subcategorymodel = require('../models/subcategorymodel')(sequelize, DataTypes);
const duplicate_category = require('../models/duplicatecategoryModel')(sequelize, DataTypes);

module.exports = { sequelize, usermodel };    