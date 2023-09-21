const express = require('express');
const router = express.Router();

const citiesController = require('./cities.controller')

// Define city routes here
router.get('/cities', citiesController.getCities);

module.exports = router;
