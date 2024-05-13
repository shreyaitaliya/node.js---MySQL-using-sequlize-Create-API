const express = require('express');

const routes = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage }).single('image');

//verify token
const { verifytoken } = require('../middelware/jwttoken');

//user controller 
const usercontroller = require('../controllers/usercontrollers');

//category controller 
const categorycontroler = require('../controllers/categorycontroller');

//subcategory controller
const subcategorycontroller = require('../controllers/subvcategory');

//user routes
routes.post('/adduser', usercontroller.adduser);
routes.post('/login', usercontroller.login);
routes.get('/profileinfo', verifytoken, usercontroller.profileinfo);

//category routes
routes.post('/categoryadd', verifytoken, categorycontroler.categoryadd);
routes.get('/categoryview', verifytoken, categorycontroler.categoryview);
routes.delete('/categorydelete', categorycontroler.categorydelete);
routes.put('/categoryupdate', categorycontroler.categoryupdate);

//subcategory routes
routes.post('/subcategoryadd', upload, subcategorycontroller.subcategoryadd);
routes.get('/subcateview', upload, subcategorycontroller.subcateview);

module.exports = routes;