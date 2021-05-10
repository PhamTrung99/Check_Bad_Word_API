const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
require('express-async-errors');
require('dotenv').config();
const check = require('./Functions/check');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/check/:content', function (req, res) {
    var content = req.params.content;
    const result = check(content);
   res.status(200).json(result);
})


app.get('/addword', function (req, res) {
    
    const result = check(content);
   res.status(200).json(result);
})




app.get('/err', function (req, res) {
    throw new Error('Error!');
})

app.use(function (req, res, next) {
    res.status(404).json({
        error_message: 'Endpoint not found'
    });
})

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
        error_message: 'Something broke!'
    });
})


app.listen(process.env.PORT, function () {
    console.log(`Sakila api is running at http://localhost:${process.env.PORT}`);
})
