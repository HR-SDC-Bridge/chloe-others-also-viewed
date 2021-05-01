require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const db = require('./database/database.js');
const getSimilarItemsByViews = require('./database/methods.js');
// const createRecord = require('./database/methods.js');
// const updateRecord = require('./database/methods.js');
const deleteRecord = require('./database/methods.js');
const path = require('path');

app.use(morgan('dev'));
app.use(cors());
app.use('/', express.static(path.resolve('public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/similar-products-by-views/:id', (req, res) => {
  console.log('req.params.id: ', req.params.id)
  getSimilarItemsByViews(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.error('Unable to get similar items by views: ', err));
});

// app.post('/similar-products-by-views/:data', (req, res) => {
//   createRecord(req.params.data)
    // .then((result) => {
    //   res.send('Success');
    // })
    // .catch((err) => {
    //   console.log('Error calling createRecord: ', err);
    // });
// });

// app.put('/similar-products-by-views/:id/:data', (req, res) => {
//   updateRecord(req.params.id, req.params.data)
//     .then((result) => {
//       res.send('Success');
//     })
//     .catch((err) => {
//       console.log('Error calling updateRecord: ', err);
//     });
// });

app.delete('/similar-products-by-views/:id', (req, res) => {
  deleteRecord(req.params.id)
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('Error calling deleteRecord: ', err);
    });
});


module.exports = app;