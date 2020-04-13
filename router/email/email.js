var express = require('express')
var app = express()
var mysql = require('mysql')
var router = express.Router()
var path = require('path') //상대경로 

//mysql express 연동 
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'inflearn'
})

connection.connect()

router.post('/form', function(req, res){
    //get : req.param('email')
    console.log(req.body.email) //body-parser use
    // res.send("<h1>welcome ! " + req.body.email +"</h1>")
    res.render('email.ejs', {'email' : req.body.email}) //name값(email)을 찾아서 클라이언트에 응답
});

router.post('/ajax', function (req,res) {
    //check validation about input value => selelct db
    // var responseData = {'result' : 'ok', 'email' : req.body.email}
    var email = req.body.email;
    var responseData = {};    
    
    var query = connection.query('select name from user where email="'+email+'"', function(err, rows){
        if(err) throw err;
        if(rows[0]){
            responseData.result = "ok";
            responseData.name = rows[0].name;
        }else{
            responseData.result = "none";
            responseData.name = "";
        }
        //res 값 
        res.json(responseData)
    })
    
});

module.exports = router;
