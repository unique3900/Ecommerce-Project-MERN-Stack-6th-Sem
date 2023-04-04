const express = require('express');
const DBConnection = require('./Configuration/db');
const morgan = require('morgan');
const dotenv = require('dotenv').config();
const app = express();


// Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({ message: "Hello" });
})

DBConnection();

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server Running");
})