const { CURRENCY_API_KEY } = require('../config')
const { default: axios } = require("axios");
const moment = require('moment');
const db = require('../models');
const { Op } = require('sequelize');
const { getToday } = require('../utils/getToday')
// RUB / EUR / USD / JPY
module.exports = {
  getCoinForToday,
  saveCurrency,
  getCurrencyByDate
}
function checkFormat(date) {
  var dateReg = /^\d{4}([-])\d{2}\1\d{2}$/;
  return date.match(dateReg);
}

async function getCurrencyByDate({ date }) {
  if (!checkFormat(date)) {
    throw { msg: 'Не валидный формат ' }
  }
  let unixTime = moment(date, 'YYYY-MM-DD').unix();
  const findedCurrencyByDate = await db.coins.findOne(intervalFilter(unixTime, unixTime + 24 * 60 * 60));
  if (!findedCurrencyByDate) {
    throw { msg: 'Не удалось получить валюты по данной дате' }
  }
  return findedCurrencyByDate;
}
async function saveCurrency({ date, currency }) {
  // check format
  if (!checkFormat(date)) {
    throw { msg: 'Не валидный формат ' }
  }
  let unixTime = moment(date, 'YYYY-MM-DD').unix();
  // check if alredy was than save in that currency
  const findedCurrency = await db.coins.findOne(intervalFilter(unixTime, unixTime + 24 * 60 * 60));
  console.log({ findedCurrency })
  if (findedCurrency) {
    throw { msg: 'Для данной даты уже сохранялась валюта' }
  }
  let savedCurrency = await db.coins.create({
    date: unixTime,
    currency: currency,
  });
  return { savedCurrency };
}
async function getCoinForToday() {
  let startOfDay = getToday();
  const todayCurrency = await db.coins.findOne(intervalFilter(startOfDay, startOfDay + 24 * 60 * 60));
  if (!todayCurrency) {
    const yesterDayCurrency = await db.coins.findOne(intervalFilter(startOfDay - 24 * 60 * 60, startOfDay));
    return yesterDayCurrency;
  }
  return todayCurrency;
}

function intervalFilter(from, to) {
  const filter = {
    where: {
      date: {
        [Op.gte]: from,
        [Op.lte]: to
      }
    }
  };
  return filter;
}
/**
 * @save
 *   const response = await axios.get(`https://api.currencyfreaks.com/latest?apikey=${CURRENCY_API_KEY}`)
  if (response.status === 200) {
    const { rates, date } = response.data;
    console.log({ date: date.split(' ')[0] });
    let mainDate = date.split(' ')[0];
    let unixTime = moment(mainDate, 'YYYY-MM-DD').unix();
    // сохраняем в сегодня, если не сохранено
    let newCoin = await db.coins.create({
      date: unixTime,
      currency: { ...rates }
    });
    return newCoin;
  } else {
    throw { msg: 'Не удалось получить валюты за сегодня' }
  }
 */