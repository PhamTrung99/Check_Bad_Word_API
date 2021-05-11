const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
require('express-async-errors');
require('dotenv').config();
const message = require('./public/message.control');


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', function (req, res) {
   res.status(200).json({
       'message': message.welcome
   });
})

app.use('/', require('./routes/main.route'));


app.get('/err', function (req, res) {
    throw new Error('Error!');
})

app.use(function (req, res, next) {
    res.status(404).json({
        error_message: message.error_endpoint
    });
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error_message: message.error_broke
    });
})


app.listen(process.env.PORT, function () {
    console.log(`API is running at http://localhost:${process.env.PORT}`);
})
