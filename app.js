var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var session = require('express-session')
var flash = require('connect-flash') //오류메시지 전달

//server start
app.listen(3000, function(){
    console.log("start! express server on port 3000")
})

/*middleware*/
//static dir setting
app.use(express.static('public'))
//body-parser setting
app.use(bodyParser.json()) //json데이터처리
app.use(bodyParser.urlencoded({extended:true})) //인코딩데이터처리
app.set('view engine', 'ejs')

app.use(session({
    secret: 'keyboard cat', //key값
    resave: false, //default
    saveUninitialized: true //default
}))
app.use(passport.initialize()) //passport.initialize
app.use(passport.session())
app.use(flash()) //flash

app.use(router)




