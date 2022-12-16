// const express = require('express');
import express from 'express';
import { generateImage } from '../controllers/openaiController.js';
// const { generateImage } = require('../controllers/openaiController');
const router = express.Router();

router.post('/generateimage', generateImage);

export default router