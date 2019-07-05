var express = require('express');
var users = require('./users.json');
var files = require('./files.json');
var app = express();

app.get('/', function(req, res){
    res.send('hello server siddhu');
});

app.route('/api/users').get(function(req, res) {
    res.send(users);
});

app.get('/api/users/:id', function(req, res) {
    var fileStructure = files[req.params.id];
    if(!fileStructure) {
        res.send('files not found for this user');
    } else {
        res.send(files[req.params.id]);
    }
});


var server = app.listen(3001, function(){

})