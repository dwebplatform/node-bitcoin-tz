
const express = require('express');
module.exports = (app) => {
  const router = express.Router();
  const coinsController = require('../controller/coin.controller');
  router.get('/today', coinsController.getCurrencyForToday);
  router.get('/', coinsController.getCurrencyByDate)
  router.post('/save', coinsController.saveCurrency);
  app.use('/coins', router);
}