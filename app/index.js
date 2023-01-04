const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

//A temp require. Will be moved to openaiRoutesSoon
const getSavedImages = require('./controllers/getSavedImagesController');

const getImages = async () => {
    const data = await getSavedImages.getImages();
    return data;
}

const app = express();

app.set('views', __dirname, 'public/views');
app.set('view engine', 'ejs');

//Enable body parser to allow body data from client /form
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Temp snippet
app.get('/saved-images', (req, res) =>{
    res.render('./public/views/pages/saved-images', {
        images: ['mop', 'broom', 'duster']  
    });
    console.log('Arraaay... ', getImages())
    getSavedImages.getImages();
});

// Add route  //require('./routes/openaiRoutes')
app.use('/openai', require('./routes/openaiRoutes'));

// Start Server
app.listen(port, () => console.log(`Server started on port ${port}`));