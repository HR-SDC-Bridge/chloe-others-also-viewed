const generateSeedData = (id, numberOfRecords) => {
  const random = (min, max) => Math.floor(Math.random() * (max - min) + min);

  let doc = {};
  doc.id = id;
  doc.similar_items = [];
  const numItemsAlsoViewed = random(1, 10);
  for (let i = 0; i < numItemsAlsoViewed; i++) {
    let itemID = random(1, numberOfRecords);
    while (itemID === i || doc.similar_items.indexOf(itemID) === 1) {
      itemID = random(1, numberOfRecords);
    }
    doc.similar_items.push(itemID);
  }

  return doc;
};

module.exports = generateSeedData;