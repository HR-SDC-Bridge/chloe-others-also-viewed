require('dotenv').config();
const mongoose = require('mongoose');
const models = require('../server/database/models.js');
const similar_items_by_views = models.similar_items_by_views;
const dbMethods = require('../server/database/methods.js');
const seed = require('../server/database/seed_methods.js');

beforeAll(async (done) => {
  mongoose.connect(`mongodb://${process.env.DATABASE}/test`, {useNewUrlParser: true, useUnifiedTopology: true});

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    console.log(`The database has connected on mongodb://${process.env.DATABASE}`);
  });

  done();
});

afterAll(async (done) => {
  await similar_items_by_views.deleteMany({}, (err, results) => {
    if (err) console.error('Unable to delete the collection similar_items_by_views: ', err);
    console.log('Collection similar_items_by_views has been cleared.')
  });
  await mongoose.disconnect();
  done();
});

describe('Seeding script', () => {
  test('Seeding script seeds 100 documents', async () => {
    let data = seed();
    similar_items_by_views.insertMany(data, (err, results) => {
      if (err) return console.error('Unable to insert data. Error: ', err);
      expect(results.length).toBe(100);
    });
  });

  test('Seeds are not the same data', async () => {
    similar_items_by_views.find({id: {$in: [1, 2]}}, (err, results) => {
      if (err) return console.error('Unable to insert data. Error: ', err);
      expect(JSON.stringify(results[0])).not.toEqual(JSON.stringify(results[1]));
    });
  });
});

describe('Database methods', () => {
  test('Method gets similar items by views for one item', async () => {
    dbMethods.getSimilarItemsByViews(1)
      .then((data) => {
        expect(data.length).not.toEqual(0);
      })
      .catch((err) => console.error(err));
  });

  test('If no item is found, give proper response', async () => {
    dbMethods.getSimilarItemsByViews(999)
      .then((data) => {
        expect(data).toEqual('No similar items by views found.');
      })
      .catch((err) => console.error(err));
  });
});