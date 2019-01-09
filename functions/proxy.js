'use strict'

/**
 * @see https://www.netlify.com/docs/functions/
 */

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (expressRequest, expressResponse) => {
    expressResponse.send('Ping!');
});

app.post('/', (expressRequest, expressResponse) => {
    request(expressRequest.body.url, (error, response, body) => {
        expressResponse.type('application/xml');
        expressResponse.send(body);
    });
});

module.exports = app;
