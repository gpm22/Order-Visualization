const express = require('express');
const dataParser = require('./data-parser');

const app = express();

const port = 3200;

app.get("/", (req, res) => {
    res.json(dataParser);
});

app.listen(port, () => {
    console.log(`Order Visualization server listening on port ${port}`);
});