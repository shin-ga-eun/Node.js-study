var express = require('express')
var app = express()
var bodyParser = require('body-parser')

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
    var responseData = {'result' : 'ok', 'email' : req.body.email}
    res.json(responseData)
});