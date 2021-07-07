const Datastore = require('nedb');

const db = new Datastore({filename: './data/uesr.db', autoload: true})


function SignUpApi (req, res) {
  //post 요청 req.method
  if (req.method !== 'POST') {
    return res.status(400).send('BAD REQUEST');
  }
  //
  console.log(req.session)
  req.session.isLoggedIn = true
  if(req.session.isLoggedIn) {
    console.log('login이 된 상태입니다.')
  } else {
    console.log('login이 안된 상태입니다.')
  }
  res.status(200).send('done')
}


function SignInApi (req, res) {
  req.session.destroy().then();
}


module.exports = {
  SignUpApi,
  SignInApi
}