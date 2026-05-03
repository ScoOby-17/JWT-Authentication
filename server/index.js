const express = require("express");
const app = express();

require('dotenv').config();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen()