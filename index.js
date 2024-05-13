const express = require('express');

const morgan = require('morgan');

const bodyparser = require('body-parser');

const app = express();

const port = 7000;
require('./config/db');

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use('/', require('./routes/userRoutes'));

app.listen(port, (error) => {
    if (error) {
        console.log(error);
        return false;
    }
    console.log(`server start on port :- ${port}`);
})