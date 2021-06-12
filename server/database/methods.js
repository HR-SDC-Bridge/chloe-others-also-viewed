const db = require('./databasePostgres.js');
const client = db.client;

const getSimilarItemsByViews = async (id) => {
  let data = await client
    .connect()
    .then(() => {
      return client
        .query(`SELECT * FROM ${process.env.PGTABLE} WHERE productid = ${id};`)
        .then((res) => {
          return res.rows;
        })
    })
  return data;
};

const postSimilarItems = async (similarItems) => {
  let newProductID = await client
    .connect()
    .then(() => {
      return client
        .query(`SELECT MAX(productid) FROM prod_x_similar;`)
        .then((response) => {
          return response.rows[0].max + 1;
        })
        .catch((err) => {
          console.log('Error getting latest product id from prod_x_similar table: ', err);
        })
    });

  await client
  .connect()
  .then(async () => {
    let insertData = '';
    for (let i = 0; i < similarItems.length; i++) {
      let stringified = similarItems[i].toString();
      let values = `(${newProductID}, `;

      if (i === similarItems.length -1) {
        values = values.concat(stringified, ')');
        insertData = insertData.concat(values);
      } else {
        values = values.concat(stringified, ')', ', ');
        insertData = insertData.concat(values);
      }
    }
    await client
      .query(`INSERT INTO prod_x_similar ("productid", "similarid") VALUES ${insertData};`)
      .catch((err) => {
        console.log('Error inserting into prod_x_similar table: ', err);
      })
  })
  .catch((err) => {
    console.log(`Error inserting new similar items: ${err}`);
  })
};

module.exports.getSimilarItemsByViews = getSimilarItemsByViews;
module.exports.postSimilarItems = postSimilarItems;