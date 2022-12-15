const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;

const app = express();

//Enable body parser to allow body data from client /form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Add route
app.use('/openai', require('./routes/openaiRoutes'));

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

if(this && typeof module == "object" && module.exports && this === module.exports) {
    module.exports = mongoConnect;
 }