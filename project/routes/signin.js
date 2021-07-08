const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const db = require('../database/db')

router.get('/', (req, res) => {
  res.render('signin');
})

router.post('/', async (req, res) => {
  const { email, pw } = req.body;

  const user = await db.asyncFindOne({ email });

  if(!user || !await bcrypt.compare(pw, user.pw)) {
    return res.status(401).json({message: "아이디 혹은 패스워드를 확인하십시오."});
  }

  req.session.isLoggedIn = true;
  req.session.nickname = user.nickname;
  res.json({url:'/'});
})

module.exports = router;