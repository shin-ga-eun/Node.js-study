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

router.get('/list', function (req, res) {
    res.render('movie.ejs')
    
})

//1. /movie , GET
router.get('/', function (req, res) {
    var responseData = {};

    var query = connection.query('select title from movie', function (err, rows) {
        if(err) throw err;
        if(rows.length) {
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = 0;
        }
        res.json(responseData);
    });    
})

//2. /movie , POST
router.post('/', function (req, res) {
    var title = req.body.title;
    var type = req.body.type;
    var grade = req.body.grade;
    var actor = req.body.actor;

    var sql = {title, type, grade, actor};

    var query = connection.query('insert into movie set ?', sql, function (err, rows) {
        if(err) throw err;
        return res.json({'result': 1});
    })
   
})

// 3. /movie/:title, GET
router.get('/:title', function (req, res) {
    var title = req.params.title;

    var responseData = {};

    var query = connection.query('select * from movie where title = ?', [title], function (err, rows) {
        if(err) throw err;
        if(rows[0]){
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = 0;
        }
        res.json(responseData);
    });
})

// 4. /movie/:title, DELETE
router.delete('/:title', function (req ,res) {
    var title = req.params.title;

    var responseData = {};
    
    var query = connection.query('delete from movie where title = ?', [title], function (err, rows) {
        if(err) throw err;
        console.log("rows >> ", rows);
        if(rows.affectedRows > 0){
            responseData.result = 1;
            responseData.data = title;
        } else {
            responseData = 0;
        }
        res.json(responseData); //client (movie.ejs)에 json 보냄.
    })
    
})

// 5. /movie/:title, PUT
/*
PUT에서 req.body에 undefined되는 오류 미해결..

*/
router.put('/:title', function(req, res){
    var title = req.params.title;
    // var type = req.body.type;
    // var grade = req.body.grade;
    // var actor = req.body.actor;

    var type = "roco";
    var grade = 5.5;
    var actor = "왜 안돼";

    // var sql = {title: title, type: type, grade: grade, actor: actor};
    var sql = {actor: actor};

    console.log(sql);

    var responseData = {};
    
    var query = connection.query("update movie set actor='"+ actor +"'where title = ?", [title], function (err, rows) {
        if(err) throw err;
        if(rows[0]){
            console.log(rows[0]);
            responseData.result = 1;
            responseData.data = rows;
        } else {
            responseData.result = 0;
        }
        res.json(responseData);
    })
  
})



module.exports = router;
