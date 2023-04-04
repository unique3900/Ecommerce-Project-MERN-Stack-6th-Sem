const express = require('express');
const DBConnection = require('./Configuration/db');
const morgan = require('morgan');
const mongoose = require('mongoose'); 
const dotenv = require('dotenv').config();
const app = express();

const authRoutes=require('./routes/authRoutes');


mongoose.connect('mongodb://localhost:27017/ecommerce');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));


// ROUTES
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({ message: "Hello" });
})

// DBConnection();


const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server Running");
})