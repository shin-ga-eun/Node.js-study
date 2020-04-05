var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mysql = require('mysql')

//mysql express 연동 
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'shinga0943',
    database: 'inflearndb'
})

connection.connect()

app.listen(3000, function(){
    console.log("start! express server on port 3000")
})

//static dir setting
app.use(express.static('public'))
//body-parser setting
app.use(bodyParser.json()) //json데이터처리
app.use(bodyParser.urlencoded({extended:true})) //인코딩데이터처리
app.set('view engine', 'ejs')

//url routing
app.get('/', function(req, res){
    res.sendFile(__dirname + "/public/main.html")
});

app.get('/main', function(req, res){
    res.sendFile(__dirname + "/public/main.html")
});

app.post('/email_post', function(req, res){
    //get : req.param('email')
    console.log(req.body.email) //body-parser use
    // res.send("<h1>welcome ! " + req.body.email +"</h1>")
    res.render('email.ejs', {'email' : req.body.email}) //name값(email)을 찾아서 클라이언트에 응답
});

app.post('/ajax_send_email', function (req,res) {
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