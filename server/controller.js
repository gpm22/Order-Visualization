const express = require("express");
const dataParser = require("./data-parser");
const cors = require("cors");

const app = express();

const port = 3200;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  console.log(
    `recebendo requisição de : ${
      req.rawHeaders[req.rawHeaders.indexOf("Referer") + 1]
    }`
  );
  res.json(dataParser);
});

app.listen(port, () => {
  console.log(`Order Visualization server listening on port ${port}`);
});
