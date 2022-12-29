const express = require('express');
// import express from 'express';
// import { generateImage } from '../controllers/openaiController.js';
const { generateImage } = require('../controllers/openaiController');
const { saveImage, getSavedImages } = require('../controllers/saveImageController');
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/saveimage', saveImage);

/* router.get('/saved-images', function(request, response) {
    response.render('../public/views/pages/index');
}); */

module.exports = router