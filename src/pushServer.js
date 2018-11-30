const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase-admin');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

firebase.initializeApp({
  databaseURL: 'https://pwa-demo-9beea.firebaseio.com/',
  credential: firebase.credential.cert(require('./serviceAccount.json')),
});

app.get('/:token', (expressRequest, expressResponse) => {
  firebase.messaging()
    .send({
      notification: {
        title: 'New content available!',
      },
      token: expressRequest.params.token,
    })
    .then(() => expressResponse.send('Success!'))
    .catch(() => expressResponse.send('Failure!'));
});

app.listen(port, () => console.log(`Push server listening on port ${port}!`));
