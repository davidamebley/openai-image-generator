const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

//Enable body parser to allow body data from client /form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Add route
app.use('/openai', require('./routes/openaiRoutes'));

// Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));