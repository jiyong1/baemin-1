const { SignUpApi, SignInApi } = require('./api/index.js');
const path = require('path');
const express = require('express');

const session = require('express-session');
const FILESTORE = require('session-file-store')(session)

const app = express();
const port = 3000;

app.use(express.json())
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'src')));
app.set('view engine', 'pug');

const SECONDS = 1000 * 5

app.use(session({
  resave: false,
  saveUninitialized :true,
  store : new FILESTORE({reapInterval: 10}),
  secret: 'FRmnpxZcLa6Oc0brJaXcoxjTm7rzOzXD',
  cookie: {
    originalMaxAge : 60000
  }
}))

// Views
app.get('/', HomePage);
app.get('/signin', SignInPage);
app.get('/clause', ClausePage);
app.get('/signup', SignUpPage);

// Api 
app.post('/signup', SignUpApi);
app.post('/signin', SignInApi);

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
