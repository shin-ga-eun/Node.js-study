var express = require('express')
var app = express()
var router = express.Router()
var path = require('path') //상대경로 
var mysql = require('mysql')

//mysql express 연동 
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'inflearndb'
})

connection.connect()

//GET
router.get('/', function(req, res){
    console.log("get join url");
    res.sendFile(path.join(__dirname, '../../public/join.html'));
});

//POST
router.post('/', function (req, res) {
    var body = req.body; //body-parser module을 사용했기 때문
    var email = body.email;
    var name = body.name;
    var password = body.password;

   
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
    var sql = {email: email, name: name, pw: password};
    var query = connection.query('insert into user set ?' , sql, function (err,rows) {
        if(err){throw err;}
        else
            res.render('welcome.ejs', {'name': name, 'id': rows.insertId}) //templete use
        })
    });

module.exports = router;