const bcrypt = require('bcryptjs');
const models = require('../db/models/index');

// function to compare the input password compared to db
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// user redirected if already logged in
function loginRedirect(req, res, next) {
  if (req.user) returnres.status(401).json(
    { status: 'You are already logged in!' }
  );

  return next();
}

// create user in db
function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(() => {
    res.redirect('/');
  });
}
