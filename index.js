var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 7776;

app.use(express.static(__dirname + '/public'));

http.listen(port, function () {
    console.log('Listening at * 7776...');
});