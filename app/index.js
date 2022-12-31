const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

app.set('views', __dirname, 'public/views');
app.set('view engine', 'ejs');

//Enable body parser to allow body data from client /form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Temp snippet
// app.get('/saved-images', (req, res) =>{
//     res.render('./public/views/pages/index')
// });

// Add route  //require('./routes/openaiRoutes')
app.use('/openai', require('./routes/openaiRoutes'));

// Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));