

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./models')
db.sequelize.sync().catch((e) => {
  console.log(e);
});
const cron = require('node-cron');
const { getNewCoinForToday, times: {
  EVERY_DAY_IN_TWELVE
} } = require('./shedule');
cron.schedule(EVERY_DAY_IN_TWELVE, getNewCoinForToday);
app.use(cookieParser());
app.use(express.json())
require('./routes/coin.route')(app);
app.listen(5000, () => console.log('Listening on port 5000'))
