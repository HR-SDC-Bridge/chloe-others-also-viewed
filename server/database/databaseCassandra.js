/*
Start Cassandra
  cd apache-cassandra-3.11.10
  bin/cassandra
Start cqlsh
  cd apache-cassandra-3.11.10
  bin/cqlsh
*/
require('dotenv').config();
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: [process.env.SERVER],
  localDataCenter: process.env.CASSDATACENTER,
  keyspace: process.env.CASSKEYSPACE
});

const connect = async () => {
  let query = `CREATE KEYSPACE IF NOT EXISTS ${process.env.CASSKEYSPACE} WITH REPLICATION = {'class': 'NetworkTopologyStrategy', '${process.env.CASSDATACENTER}': 1};`;

  await client.execute(query)
    .then(async () => {
      query = `CREATE TABLE IF NOT EXISTS ${process.env.CASSTABLE} (
        relationid UUID PRIMARY KEY,
        productid int,
        similarid int
      ) WITH comment='Products and their similar items';`;

      await client.execute(query)
        .catch((err) => {
          console.log( `Error creating table ${process.env.CASSTABLE}`);
        });
    })
    .catch((err) => {
      console.log(`Error creating keyspace ${process.env.CASSKEYSPACE}: ${err}`);
    });
};

client.connect = connect;

module.exports.client = client;