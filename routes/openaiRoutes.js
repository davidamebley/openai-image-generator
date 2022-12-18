const express = require('express');
// import express from 'express';
// import { generateImage } from '../controllers/openaiController.js';
const { generateImage } = require('../controllers/openaiController');
const { saveImage } = require('../controllers/saveImageController');
const router = express.Router();

router.post('/generateimage', generateImage);
router.post('/saveimage', saveImage);

module.exports = router