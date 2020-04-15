var express = require('express')
var app = express()
var router = express.Router()

app.get('/', function(req, res){
    req.logout();
    res.redirect('/login');
  });

module.exports = router;