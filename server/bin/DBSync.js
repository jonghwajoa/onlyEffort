const db = require('../db');

const dbSync = async () => {
  await db.sequelize.sync();
};

module.exports = {
  dbSync
};
