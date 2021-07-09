const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  
  res.render('index', {nickname: req.session.nickname});
})

module.exports = router;