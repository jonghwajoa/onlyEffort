const DB = require('../db');

DB.sequelize
  .sync({ force: true })
  .then(() => {
    console.log('success');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
