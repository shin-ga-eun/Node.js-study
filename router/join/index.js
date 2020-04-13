var express = require('express')
var app = express()
var router = express.Router()
var path = require('path') //상대경로 
var mysql = require('mysql')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

//mysql express 연동 
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'inflearn'
})

connection.connect()

//GET
router.get('/', function(req, res){
    console.log("get join url");
    res.render('join.ejs');
});

//local-join Strategy 생성
passport.use('local-join', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req,email,password, done){
        console.log('local-join callback called');
    }
));

//routing
router.post('/', passport.authenticate('local-join', {
        successRedirect: '/main',
        failureRedirect: '/join',
        failureFlash: true 
    })
)


//POST
// router.post('/', function (req, res) {
//     var body = req.body; //body-parser module을 사용했기 때문
//     var email = body.email;
//     var name = body.name;
//     var password = body.password;
   
    //query문 작성
     /*
    var query = connection.query('insert into user (email,name,pw) values ("' + email + '", "' + name +'","' + password + '")', function (err,rows) {
        if(err){throw err;}
        console.log("ok db insert");
    })
    */


    //escaping query
    //-> 데이터를 전달할 때 문자열을 인코딩하는 걸 말함.
    //-> sql injection을 방지하기 위함.
    // var sql = {email: email, name: name, pw: password};
    // var query = connection.query('insert into user set ?' , sql, function (err,rows) {
    //     if(err){throw err;}
    //     else
    //         res.render('welcome.ejs', {'name': name, 'id': rows.insertId}) //templete use
    //     })
    // });

module.exports = router;