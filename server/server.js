require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database/database.js');
const getSimilarItemsByViews = require('./database/methods.js');
const path = require('path');

app.use(morgan('dev'));
app.use(cors());
app.use('/', express.static(path.resolve('public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/similar-products-by-views/:id', (req, res) => {
  getSimilarItemsByViews(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.error('Unable to get similar items by views: ', err));
});

/*
Create / POST - create a new item:
  Create new records in the db (Client needs to provide an array of ID's for the similar_items field. DB should auto increment the id field.)
Read / GET - read an item:
  DONE - /similar-products-by-views/:id
Update / PUT - update an item:
  Update existing records in the db (Client needs to provide the id it wants to update and an array of ID's to update the document with)
Delete / DELETE - delete an item:
  Delete existing record (Client needs to provide the id it wants to delete - possibly allow client to send an array of id's if it wants to delete multiple at a time)
 */

module.exports = app;