const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (expressRequest, expressResponse) => {
  expressResponse.send('Ping!');
});

app.post('/rss', (expressRequest, expressResponse) => {
  request(expressRequest.body.url, (error, response, body) => {
    expressResponse.type('application/xml');
    expressResponse.send(body);
  });
});

app.listen(port, () => console.log(`Proxy server listening on port ${port}!`));
