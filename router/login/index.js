var express = require('express')
var app = express()
var router = express.Router()
var path = require('path') //상대경로 
var mysql = require('mysql')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

//mysql database 연동
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
    var msg;
    var errMsg = req.flash('error')
    if(errMsg) msg = errMsg;
    res.render('login.ejs', {'message': msg});
});

//serializer - done false가 아닌 경우 사용 -> 로그인 시 실행되는 done(null, user);에서 user 객체를 받아 세션에 저장한다.
passport.serializeUser(function(user, done) {
    console.log('passport session save : ', user.id)
    done(null, user.id); 
});
//deserializeUser - session에서 id를 뽑아서 전달
passport.deserializeUser(function(id, done){
    console.log('passport session get id : ', id)
    done(null, id);
})

//local-join Strategy 생성
passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req,email,password, done){
        console.log('local-login callback called');
        var query = connection.query('select * from user where email=?', [email], function(err,rows){
            if(err) return done(err);
            
            if(rows.length){
                return done(null, {'email' : email, 'id' : rows[0].id})  
            } else {
                    return done(null, false, {'message': 'your login info is not found >.<'});
            }
    

        })
    }
));

//custom callback - Ajax니까 json으로 응답을 해야하기 때문에 사용함
router.post('/', function(req,res,next){
    passport.authenticate('local-login', function(err,user,info){
        if(err) {
            res.status(500).json(err);
        }
        if(!user) return res.status(401).json(info.message);
        
        req.logIn(user, function(err){
            if(err) { return next(err); } 
            return res.json(user);
        });
    })(req, res, next);
})

module.exports = router;