var express = require('express')
var app = express()
var router = express.Router()
var path = require('path') //상대경로 

//main page 는 login이 될 때만 (= 세션정보가 있을 때만) 접근이 가능하게 하자.
router.get('/', function(req, res){
    console.log('main is loaded', req.user); //passport.deserializeUser의 id는 req.user로 접근할 수 있음
    var id = req.user;
    if(!id) res.render('login.ejs');
    res.render('main.ejs', {'id': id});
});

module.exports = router;