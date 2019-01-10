'use strict'

/**
 * @see https://www.netlify.com/docs/functions/
 */

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Ping!');
});

app.post('/', (req, res) => {
    request(req.body.url, (error, response, body) => {
        res.type('application/xml');
        res.send(body);
    });
});

module.exports = app;
module.exports.handler = serverless(app);
