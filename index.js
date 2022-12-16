// const path = require('path');
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import router from './routes/openaiRoutes.js';
// const express = require('express');
// const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
import { MongoClient } from 'mongodb';
// const MongoClient = require('mongodb').MongoClient;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Enable body parser to allow body data from client /form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Add route  //require('./routes/openaiRoutes')
app.use('/openai', router);

const mongoConnect = async() => {
    const uri = 'mongodb://admin:password@localhost:27017';

    try {
        const client = await MongoClient.connect(uri,{ useNewUrlParser: true });

        return client;
      } catch(e) {
        console.error(e)
      }
}


// Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));

export { mongoConnect };


/* if(this && typeof module == "object" && module.exports && this === module.exports) {
    module.exports = mongoConnect;
 } */