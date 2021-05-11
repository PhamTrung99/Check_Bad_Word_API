const express = require('express');
const morgan = require('morgan');
var cors = require('cors');
require('express-async-errors');
require('dotenv').config();
const message = require('./public/message.control');

const swagOption = require('./swagger/swaggerOptions');
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const auth = require('./middlewares/auth.mdw');


const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', function (req, res) {
   res.status(200).json({
       message: message.welcome,
       description: message.description
   });
})

const swaggerDocs = swaggerJsDoc(swagOption);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/',auth, require('./routes/main.route'));


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


/**
 * @swagger
 * openapi: 3.0.0
 * securityDefinitions:
 *  Bearer:
 *    type: apiKey
 *    name: api-key
 *    in: header
 * tags:
 *  - name: main
 * paths:
 *  /check/{content}:
 *   get:
 *      security:
 *          - Bearer: []
 *      tags:
 *          - main
 *      summary: Check badword of content
 *      parameters:
 *          - name: content
 *            in: path
 *            required: true
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json
 *  /addword/{newbadword}:
 *   get:
 *      security:
 *          - Bearer: []
 *      tags:
 *          - main
 *      summary: add new bad word
 *      parameters:
 *          - name: newbadword
 *            in: path
 *            required: true
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json
 *  /removeword/{removeword}:
 *   get:
 *      security:
 *          - Bearer: []
 *      tags:
 *          - main
 *      summary: remove bad word
 *      parameters:
 *          - name: removeword
 *            in: path
 *            required: true
 *      responses:
 *          '200':
 *              description: OK
 *              content:
 *                  application/json
 */