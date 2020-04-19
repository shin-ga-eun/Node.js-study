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

//flash message 처리 
router.get('/', function(req, res){
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
    res.render('join.ejs', {'message': msg});
});

/* session 을 저장하는 처리부분 start */
//serializer - done false가 아닌 경우 사용
passport.serializeUser(function(user, done) {
    console.log('passport session save : ', user.id)
    done(null, user.id);
});
//deserializeUser - session에서 id를 뽑아서 처리 
passport.deserializeUser(function(id, done){
    console.log('passport session get id : ', id)
    done(null, id);
})
/* session 을 저장하는 처리부분 end */

//local-join Strategy 생성
passport.use('local-join', new LocalStrategy({
        usernameField: 'email', //ejs form name
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done){
        var query = connection.query('select * from user where email=?', [email], function(err,rows){
            if(err) return done(err);

            if(rows.length){ //오류처리
                console.log('existed user')
                return done(null, false, {message: 'your email is already used'}) 
            } else { //정상처리 
                var sql = {email: email, pw: password};
                var query = connection.query('insert into user set ?', sql, function(err, rows){
                    if(err) throw err
                    return done(null, {'email' : email, 'id' : rows.insertId});
                })
            }
        })
    }
));

//passport 기반 router 설정 
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