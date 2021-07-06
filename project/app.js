const { SignUpApi, SignInApi } = require('./api/index.js');
const path = require('path');
const express = require('express');

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'src')));
app.set('view engine', 'pug');

// Views
app.get('/', HomePage);
app.get('/signin', SignInPage);
app.get('/clause', ClausePage);
app.get('/signup', SignUpPage);

// Api 
app.post('/signup-api', SignUpApi);
app.post('/signup-api', SignInApi);

function HomePage(_, res) {
  res.render('index');
}

function SignInPage(_, res) {
  res.render('signin');
}

function ClausePage(_, res) {
  res.render('clause');
}

function SignUpPage(_, res) {
  res.render('signup');
}


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
