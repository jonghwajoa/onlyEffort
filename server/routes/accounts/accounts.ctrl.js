const login = (req, res) => {
  res.render('accounts/login');
};

const join = (req, res) => {
  res.end('join.');
};

module.exports = {
  login,
  join
};
