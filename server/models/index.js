// const dbConfig = require("../config/db.config");
const filepaths = require('filepaths');
const Sequelize = require("sequelize");

const sequelize = new Sequelize('mysql://root:@localhost/roombot_db?charset=UTF8');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
let routes = filepaths.getSync('./models');
for (let path of routes) {// перебор по роутам, чтобы не нужно было писать require('./testModel.model.js")(sequelize,Sequelize);
  let [main, sub] = path.split('\\');
  if (sub === 'index.js') {
    continue;
  } else {
    let [name, model, ext] = sub.split('.');
    db[`${name}s`] = require(`./${name}.${model}.${ext}`)(sequelize, Sequelize);
  }
}

module.exports = db;