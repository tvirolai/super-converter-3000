
var fs = require('fs');
var Serializers = require('marc-record-serializers');

var RecordConverter = require('./RecordConverter');

var parser = new Serializers.ISO2709.ParseStream();

var encoder = new Serializers.ISO2709.EncodeStream();

var transformer = new RecordConverter();

process.stdin
	.pipe(parser)
	.pipe(transformer)
	.pipe(encoder)
	.pipe(process.stdout);


