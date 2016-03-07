var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 7776;

app.use(express.static(__dirname));

app.get('/node_modules', function () {
  res.sendFile(__dirname + '/node_modules');
});

app.get('/public/js', function () {
  res.sendFile(__dirname + '/public/js');
});

http.listen(port, function () {
    console.log('Listening at * 7776...');
});
