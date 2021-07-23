const express = require("express");

// connecting db
require("./db/mongoose");

const bajajRouter = require("./routers/bajajRouter");

const app = express();

app.use(express.json());
app.use(bajajRouter);

module.exports = app;
