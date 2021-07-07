const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const db = require('../database/db')

function passwordValidator(pw) {
  let count = 0;
  const emptyRe = /\s/;
  const smaeCountRe = /(\d)\1\1/;
  const numberRe = /\d+/;
  const upperAlphaRe = /[A-Z]+/;
  const lowerAlphaRe = /[a-z]+/;
  const specialCharRe = /[~!@#$%^&*()_+\-|<>?:;`,{}\]\[/\'\"\\\']+/;
  
  if (emptyRe.test(pw)) return false; //공백 사용
  if (smaeCountRe.test(pw)) return false; //같은 숫자 3개
  if (pw.length < 10) return false;

  
  let numArr = pw.match(/\d{3,}/g) || ''
  
  for(a of numArr) {
    let preNumber = +a[0];
    let upperCount = 1;
    let lowerCount = 1;
    for(let i = 1; i < a.length; i++) {
      let lowerFlag = false;
      let upperFlag = false;
      if (preNumber === (+a[i])+1) lowerFlag = true;
      else if (preNumber === (+a[i])-1) upperFlag = true;

      if (lowerFlag) lowerCount++;
      else lowerCount = 1;
      if (upperFlag) upperCount++;
      else upperCount = 1;

      if (upperCount === 3 || lowerCount === 3) return false;
      preNumber = +a[i];
    }
  }  
  
  if (numberRe.test(pw)) count++;
  if (upperAlphaRe.test(pw)) count++;
  if (lowerAlphaRe.test(pw)) count++;
  if (specialCharRe.test(pw)) count++;
  if (count < 2) return false;
  
  return true;
}

router.get('/', (req, res) => {
  res.render('signup');
})

router.post('/', async (req, res) => {
  //체크박스, 14세이상, 핸드폰, 이메일, 닉네임, 비밀번호, 생년월일
  const userData = req.body
  const checked = ["checkCount", "overFourteen", "phone", "email", "nickname", "birth", "pw"]

  for(info of checked) {
    if(!userData[info]) 
      return res.status(400).json({message: "올바르지 않은 데이터입니다."})
  }
  const idCount = await db.asyncCount({id : userData.id})
  if (idCount) {
    return res.status(406).json({message: '중복된 아이디 입니다.'});
  }
  const nickCount = await db.asyncCount({nickname: userData.nickname});
  if (nickCount) {
    return res.status(406).json({message: '중복된 닉네임 입니다.'});
  }
  if (!passwordValidator(userData.pw)) {
    return res.status(406).json({message: '올바르지 않은 비밀번호 형식입니다.'});
  }

  userData.pw = await bcrypt.hash(userData.pw, 10);

  await db.asyncInsert(userData);
  res.redirect('/signin');  
});

module.exports = router;