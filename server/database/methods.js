const db = require('./databasePostgres.js');
const client = db.client;

const getSimilarItemsByViews = async (id) => {
  let data = await client
    .connectClient()
    .then(() => {
      return client
        .query(`SELECT * FROM ${process.env.PGTABLE} WHERE productid = 1;`)
        .then((res) => {
          return res.rows;
        })
    })

  return data;
};

module.exports.getSimilarItemsByViews = getSimilarItemsByViews;