module.exports = (sequelize, Sequelize) => {
  const Coin = sequelize.define('coins', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: Sequelize.INTEGER
    },
    currency: {
      type: Sequelize.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('currency'));
      },
      set: function (value) {
        this.setDataValue('currency', JSON.stringify(value));
      }
    }
  });
  return Coin;
}