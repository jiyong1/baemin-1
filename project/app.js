import { SignUpApi } from './api';
import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'pug');

// Views
app.get('/', HomePage);
app.get('/signin', SignInPage);
app.get('/clause', ClausePage);
app.get('/signup', SignUpPage);

// Api 
app.post('/signup-api', SignUpApi);

function HomePage(_, res) {
  res.render('index');
}

function SignInPage(_, res) {
  res.render('signup');
}

function ClausePage(_, res) {
  res.render('signin');
}

function SignUpPage(_, res) {
  res.render('clause');
}

function SignUpApi(req, _) {

}

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
