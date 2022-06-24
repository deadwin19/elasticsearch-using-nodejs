const express = require("express");
const bodyParser = require("body-parser");
const elasticClient = require("./config/elastic-client");
const createIndex = require("./common/create-index");
const port = 4000;

const app = express();

app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send("Hello World!");
})

app.post("/create-index", async (req, res) => {
    const result = await createIndex(req.body.name);
    res.send(result);
});

app.post("/create-post", async (req, res) => {
    const result = await elasticClient.index({
      index: "blogs",
      document: {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
      },
    });
    res.send(result);
});

app.get("/blogs", async (req, res) => {
    const result = await elasticClient.search({
      index: "blogs",
      query: { match_all: {} },
    });
  
    res.send(result);
});

app.get("/search", async (req, res) => {
    const result = await elasticClient.search({
      index: "blogs",
      query: { fuzzy: { title: req.query.query } },
    });
  
    res.json(result);
});


app.get("/remove-post", async (req, res) => {
    const result = await elasticClient.delete({
      index: "blogs",
      id: req.query.id,
    });
  
    res.json(result);
});

app.listen(port, () => {
    console.log("Server started...");
})