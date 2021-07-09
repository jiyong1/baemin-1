const {AsyncNedb} = require('nedb-async')
const db = new AsyncNedb({filename : './database/data/user.db', autoload:true});


module.exports = db