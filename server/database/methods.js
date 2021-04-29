const Promise = require('bluebird');
const models = require('./models.js');

const getSimilarItemsByViews = Promise.promisify(
  (query, callback) => {
    models.similar_items_by_views.find({id: query}, (err, results) => {
      if (err) {
        return console.error(err);
      }
      if (results.length === 0) {
        return callback(null, 'No similar items by views found.');
      }
      callback(null, results);
    });
  }
);

const createRecord = (data) => {
  models.similar_items_by_views.find().sort({id: -1}).limit(1)
    .then((maxID) => {
      models.insertOne({id: maxID + 1, similar_items: data});
    })
    .catch((err) => {
      console.log('Error creating record: ', err);
    });
};

const updateRecord = (id, data) => {
  models.findOneAndUpdate({id: id}, {$set: { similar_items: data}})
    .catch((err) => {
      console.log(`Error updating record for id = ${id}: ${err}`);
    });
};

const deleteRecord = (id) => {
  models.findOneAndDelete({id: id})
    .catch((err) => {
      console.log(`Error deleting record for id = ${id}: ${err}`);
    });
};

module.exports = getSimilarItemsByViews;
module.exports = createRecord;
module.exports = updateRecord;
module.exports = deleteRecord;