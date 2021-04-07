const { CURRENCY_API_KEY } = require('./config');
const moment = require('moment');
const { default: axios } = require('axios');
const db = require('./models');
const EVERY_DAY_IN_TWELVE = '0 12 * * * ';
module.exports = {
  times: {
    EVERY_DAY_IN_TWELVE
  },
  getNewCoinForToday
}
async function getNewCoinForToday() {
  const response = await axios.get(`https://api.currencyfreaks.com/latest?apikey=${CURRENCY_API_KEY}&symbols=RUB,EUR,USD,JPY`)
  if (response.status === 200) {
    const { rates, date } = response.data;
    let mainDate = date.split(' ')[0];
    let unixTime = moment(mainDate, 'YYYY-MM-DD').unix();
    let newCoin = await db.coins.create({
      date: unixTime,
      currency: { ...rates }
    });
    return newCoin;
  } else {
    throw { msg: 'Не удалось получить валюты за сегодня' }
  }
}