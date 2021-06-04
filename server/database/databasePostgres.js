require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

const connectClient = async () => {
  await client
  .connect()
  .then(async (message) => {
    console.log(`Connected to Postgres db on port ${process.env.PGPORT}`);

    await client
      .query(`SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = '${process.env.PGDATABASE}');`)
      .then(async (result) => {
        if(!result.rows[0].exists) {
          await client
            .query(`CREATE DATABASE ${process.env.PGDATABASE};`)
            .catch((err) => {
              console.log(`Error creating database ${process.env.PGDATABASE}`);
            })
        }
      })
      .then(async () => {
        await client
          .query('CREATE TABLE IF NOT EXISTS prod_x_similar (relationid SERIAL PRIMARY KEY, productid INTEGER, similarid INTEGER);')
          .then(async () => {
            await client
              .query('CREATE INDEX IF NOT EXISTS pxs_index ON prod_x_similar (productid);')
              .catch((err) => {
                console.log('Error creating index on prod_x_similar: ', err);
              })
          })
          .catch((err) => {
            console.log(`Error creating Postgres table: ${err}`);
          });
      })
      .catch((err) => {
        console.log(`Error querying for database existence: ${err}`);
      })
  })
  .catch((err) => {
    console.log('Error connecting to Postgres db: ', err);
  });
};

client.connectClient = connectClient;

module.exports.client = client;