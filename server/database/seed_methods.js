const generateSeedData = (id, numberOfRecords, isPG, isCass) => {
  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

  let doc = {};
  let crossRef = '';
  let cassBatchInsert = '';
  doc.id = id;
  doc.similar_items = [];
  doc.pgSimilarItems = '';
  doc.cassSimilarItems = '';

  const numItemsAlsoViewed = random(1, 10);

  for (let i = 0; i < numItemsAlsoViewed; i++) {
    let itemID = random(1, numberOfRecords);

    while (itemID === i || doc.similar_items.indexOf(itemID) !== -1 || doc.pgSimilarItems.includes(`(${id}, ${itemID})`) || doc.cassSimilarItems.includes(`, ${id}, ${itemID})`)) {
      itemID = random(1, numberOfRecords);
    }

    if (isPG) {
      crossRef = `(${id}, ${itemID})`;
      doc.pgSimilarItems += i === 0 ? crossRef : `, ${crossRef}`;
    } else if (isCass) {
      crossRef = `(uuid(), ${id}, ${itemID})`;
      doc.cassSimilarItems += `INSERT INTO ${process.env.CASSKEYSPACE}.${process.env.CASSTABLE} (${process.env.CASSCOLUMNS}) VALUES ${crossRef};`;
    } else {
      doc.similar_items.push(itemID);
    }

    crossRef = '';
  }

  return doc;
};

module.exports = generateSeedData;