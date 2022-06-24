const elasticClient = require("../config/elastic-client");

const createIndex = async (indexName) => {
  await elasticClient.indices.create({ index: indexName });
  console.log("Index created");
};

module.exports = createIndex;