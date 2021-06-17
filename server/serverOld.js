//C.Tan: Commenting out entire file because not used anymore.
// require('dotenv').config();
// const express = require('express');
// const app = express();
// const morgan = require('morgan');
// const cors = require('cors');
// const db = require('./database/database.js');
// const dbMethods = require('./database/methods.js');
// const path = require('path');
// const bodyParser = require('body-parser');

// app.use(morgan('dev'));
// app.use(cors());
// app.use('/', express.static(path.resolve('public')));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get('/:id', (req, res) => {
//   res.sendFile(path.resolve('public/index.html'));
// });

// app.get('/similar-products-by-views/:id', (req, res) => {
//   dbMethods.getSimilarItemsByViews(req.params.id)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.error('Unable to get similar items by views: ', err);
//     });
// });

// app.post('/similar-products-by-views', (req, res) => {
//   dbMethods.createSimilarItems(req.body.similar_items)
//     .then((httpStatus) => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log(`Error creating record: ${err}`);
//       res.sendStatus(500);
//     });
// });

// app.put('/similar-products-by-views/:id', (req, res) => {
//   dbMethods.updateSimilarItem(req.params.id, req.body.similarItems)
//     .then((result) => {
//       res.sendStatus(200);
//     })
//     .catch((err) => {
//       console.log('Error calling updateRecord: ', err);
//       res.sendStatus(500);
//     });
// });

// app.delete('/similar-products-by-views/:id', (req, res) => {
//   dbMethods.deleteSimilarItems(req.params.id)
//     .then((result) => {
//       res.sendStatus(204);
//     })
//     .catch((err) => {
//       console.log('Error calling deleteRecord: ', err);
//     });
// });


// module.exports = app;