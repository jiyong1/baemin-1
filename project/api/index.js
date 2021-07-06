const Datastore = require('nedb');

const db = new Datastore({filename: './data/uesr.db', autoload: true})


function SignUpApi (req, res) {
}


function SignInApi (req, res) {
}

module.exports = {
  SignUpApi,
  SignInApi
}