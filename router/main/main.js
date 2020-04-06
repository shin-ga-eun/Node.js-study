var express = require('express')
var app = express()
var router = express.Router()
var path = require('path') //상대경로 

router.get('/', function(req, res){
    console.log('main js loaded')
    res.sendFile(path.join(__dirname, "../public/main.html"))
});

module.exports = router;