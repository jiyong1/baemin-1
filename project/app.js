const path = require('path');
const express = require('express');
const session = require('express-session');
require("dotenv").config();
const routers = require('./routes')


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()) //post body read to json
app.use(express.static(path.join(__dirname, 'src')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(session({
  resave: false,
  saveUninitialized :true,
  secret: process.env.SECRET_KEY,
}))

// router
app.use('/', routers.main);
app.use('/signin', routers.signin);
app.use('/signup', routers.signup);
app.use('/logout', routers.logout);

// 404
app.use((req, res, next) => {
  const err = new Error("NOT FOUND");
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.render("error", {err})
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
