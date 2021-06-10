require('dotenv').config();
const { Client, Pool } = require('pg');

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

pool
  .connect()
  .then((client) => {
    console.log(`Connected to Postgres db on port ${process.env.PGPORT}`);

    return client
      .query(`SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = '${process.env.PGDATABASE}');`)
      .then(async (result) => {
        if(!result.rows[0].exists) {
          await client
            .query(`CREATE DATABASE ${process.env.PGDATABASE};`)
            .then((res) => {
              client.release();
            })
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
              .then((res) => {
                client.release();
              })
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

module.exports.client = pool;