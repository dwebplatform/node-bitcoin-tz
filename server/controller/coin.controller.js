
const coinService = require('../services/coin.service');
exports.getCurrencyByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const currency = await coinService.getCurrencyByDate({ date });
    return res.json({ status: 'ok', currency })
  } catch (e) {
    const msg = e.msg || 'Не удалось получить валюты для такой даты';
    return res.json({ status: 'error', msg })
  }
}
exports.saveCurrency = async (req, res) => {
  try {
    const { date, currency } = req.body;
    const { savedCurrency } = await coinService.saveCurrency({ date, currency });
    return res.json({ status: 'ok', savedCurrency, msg: 'save currency for today date' });
  } catch (e) {
    const msg = e.msg || 'не удалось сохранить валюту';
    return res.json({ status: 'error', msg })
  }
}
exports.getCurrencyForToday = async (req, res) => {
  try {
    const currency = await coinService.getCoinForToday();
    return res.json({ status: 'ok', currency: currency, msg: 'get all coins for today date' });
  } catch (e) {
    const msg = e.msg || 'Не удалось получить валюту за сегодня';
    return res.json({ status: 'error', msg })
  }
}