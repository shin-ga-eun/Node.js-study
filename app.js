var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var router = require('./router/index')

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

app.use(router)




