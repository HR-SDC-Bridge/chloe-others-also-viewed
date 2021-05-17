require('dotenv').config();
const db = require('./databaseCassandra.js');
const client = db.client;
const generateSeedData = require('./seed_methods.js');

const seedCass = async (numRecords) => {
  let data = '';
  let dataHolder = [];
  let products = '';
  let productRelations = '';
  let productRelationsID = 1;
  let chunk = numRecords/100000 > 1 ? numRecords/100000 : numRecords;
  let query = `TRUNCATE ${process.env.CASSKEYSPACE}.${process.env.CASSTABLE};`;

  await client.connect();
  await client.execute(query)
          .catch((err) => {
            console.log(`Error deleting from ${process.env.CASSTABLE}: ${err}`);
          });

  for (var i = 1; i <= numRecords; i++) {
    dataHolder.push(i);
    products += i === 1 ? `(uuid(), ${i.toString()})` : `, (uuid(), ${i.toString()})`;

    data += generateSeedData(i, numRecords, false, true).cassSimilarItems;

    if (dataHolder.length === chunk) {
      query = `BEGIN BATCH ${data} APPLY BATCH;`;
      await client.execute(query)
        .catch((err) => {
          console.log(`Error inserting into table ${process.env.CASSTABLE}: ${err}`);
        });
      data = '';
      dataHolder = [];
    }
  }

  console.log('Successfully inserted into prod_x_similar');
};

const timeSeedingCass = async (num) => {
  console.time(`Time it takes to seed ${num} records in Cassandra`);
  await seedCass(num);
  console.timeEnd(`Time it takes to seed ${num} records in Cassandra`);

};

timeSeedingCass(10000000);

