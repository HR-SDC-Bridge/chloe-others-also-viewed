const db = require('./databasePostgres.js');
const client = db.client;
const generateSeedData = require('./seed_methods.js');

const seedPG = async (numRecords) => {
  let data = '';
  let dataHolder = [];
  let products = '';
  let productRelations = '';
  let productRelationsID = 1;
  let chunk = numRecords/100 > 1 ? numRecords/100 : numRecords;

  await client.connectClient();
  await client
          .query(`TRUNCATE prod_x_similar;`)
          .catch((err) => {
            console.log(`Error truncating prod_x_similar: `, err);
          });

  for (var i = 1; i <= numRecords; i++) {
    dataHolder.push(i);

    if (data === '') {
      data += generateSeedData(i, numRecords, true, false).pgSimilarItems;
    } else {
      data += `, ${generateSeedData(i, numRecords, true, false).pgSimilarItems}`;
    }

    if (dataHolder.length === chunk) {
      await client
        .query(`INSERT INTO prod_x_similar ("productid", "similarid") VALUES ${data};`)
        .catch((err) => {
          console.log('Error inserting into prod_x_similar table: ', err);
        })

      data = '';
      dataHolder = [];
    }
  }

  console.log('Successfully inserted into prod_x_similar');
};

const timeSeedingPG = async (num) => {
  console.time(`Time it takes to seed ${num} records in Postgres`);
  await seedPG(num);
  console.timeEnd(`Time it takes to seed ${num} records in Postgres`);
};

timeSeedingPG(10000000);