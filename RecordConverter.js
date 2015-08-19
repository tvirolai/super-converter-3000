"use strict";


var util = require('util');
var Transform = require('stream').Transform;

var RecordValidator = require('./record_validator');
var validator = new RecordValidator();
validator.registerValidator( require('marc-record-validate/validators/Alias') );


util.inherits(RecordConverter, Transform);

function RecordConverter(options) {
	options = options || {};

	// read and write objects
	options.writableObjectMode = true;
	options.readableObjectMode = true;
	
	Transform.call(this, options);

	this._transform = function(record, encoding, done) {
		var self = this;
		// handle transformation of the record.
		
		validator.fix(record).then(function(fixedRecord) {

			self.push(fixedRecord);
			done();

		}).done();

	}
}


module.exports = RecordConverter;