//C.Tan: Commenting out entire file because not used anymore.
// const Promise = require('bluebird');
// const models = require('./models.js');

// const getSimilarItemsByViews = Promise.promisify(
//   (query, callback) => {
//     models.similar_items_by_views.find({id: query}, (err, results) => {
//       if (err) {
//         return console.error(err);
//       }
//       if (results.length === 0) {
//         return callback(null, 'No similar items by views found.');
//       }
//       callback(null, results);
//     });
//   }
// );

// const createSimilarItems = Promise.promisify(
//   (query, callback) => {
//     models.similar_items_by_views.find({}).sort({id: -1}).limit(1)
//       .then((res) => {
//         let newID = res[0].id + 1;
//         models.similar_items_by_views.create({id: newID, similar_items: query});
//         callback(null, res);
//       })
//       .catch((err) => {
//         console.log(`Error finding maximum id: ${err}`);
//         callback(err);
//       });
//   }
// );

// const updateSimilarItem = Promise.promisify(
//   (id, data, callback) => {
//     models.similar_items_by_views.updateOne({id: id}, {$set: { similar_items: data}})
//       .then((res) => {
//         callback(null, res);
//       })
//       .catch((err) => {
//         console.log(`Error updating record for id ${query}: ${err}`);
//         callback(err);
//       });
//   }
// );

// const deleteSimilarItems = Promise.promisify(
//   (id, callback) => {
//     models.similar_items_by_views.deleteOne({id: id}, (err, results) => {
//       if (err) {
//         console.log(`Error deleting id ${id}: ${err}`);
//       } else {
//         callback(null, results);
//       }
//     });
//   }
// );

// module.exports.getSimilarItemsByViews = getSimilarItemsByViews;
// module.exports.createSimilarItems = createSimilarItems;
// module.exports.updateSimilarItem = updateSimilarItem;
// module.exports.deleteSimilarItems = deleteSimilarItems;