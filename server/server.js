require('dotenv').config();
const newrelic = require('newrelic');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const dbMethods = require('./database/methods.js');
const path = require('path');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(cors());
app.use('/', express.static(path.resolve('public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/similar-products-by-views/:id', (req, res) => {
  dbMethods.getSimilarItemsByViews(req.params.id)
    .then((items) => {
      let data = [];

      for (let i = 0; i < items.length; i++) {
        data.push(items[i].similarid);
      }

      res.send(data);
    })
    .catch((err) => {
      // console.error(`Unable to get similar items by views: ${err}`);
      res.sendStatus(500);
    });
});

app.post('/similar-products-by-views/:similarItems', (req, res) => {
  let items = req.params.similarItems.split(',');

  dbMethods.postSimilarItems(items)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      // console.error(`Unable to post similar items: ${err}`);
      res.sendStatus(500);
    });
});

module.exports = app;


