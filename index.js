"use strict";

var express = require('express');
var Serializers = require('marc-record-serializers');
var fs = require('fs');
var path = require('path');

var app = express();
app.use(express.static('public'));

app.get('/:id', function (req, res) {

  res.send('Hello World!' + req.params.id);
});

app.get('/record/:number', function(req, res) {

	var file = "files1.mrc";
	var recordsFile = path.resolve(__dirname, "data/" + file);
	var parser = new Serializers.ISO2709.ParseStream();

	var readStream = fs.createReadStream(recordsFile);
	readStream.setEncoding('utf8');

	readStream.pipe(parser);
	var count = 0;
	var found = false;
	parser.on('data', function(record) {
		count++;
		if (count === parseInt(req.params.number, 10)) {
			
			res.send(record.toJsonObject());
			found = true;
		}
		
	});
	parser.on('end', function() {
		if (!found) {
			res.sendStatus(404);
		}
	})



});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


