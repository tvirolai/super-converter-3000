(function(root, factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		define([ 'react' ], factory);
	} else if(typeof exports === 'object') {
		module.exports = factory(  // jshint ignore:line
			require('react/addons')
		);
	}
}(this, function(React) {
	"use strict";

	var cx = React.addons.classSet;

	var FieldList = React.createClass({

		render: function() {
	
			var record = this.props.record;

			var fields = record.fields.slice();
			fields.unshift({
				tag: "LDR",
				value: record.leader
			});

			var fieldNodes = fields.map(function(field, index) {
				 
				//todo, use MarcRecord class to check field type
				if (field.subfields === undefined) { //controlfield

					var classes = cx({
						'controlfield': true,
						'wasUsed': field.wasUsed,
						'fromPreferred': field.fromPreferred,
						'fromOther': field.fromOther
				  	});

					return (
						<span className={classes}>
							<span className="tag">{field.tag}</span>
							<span className="pad">    </span>
							<span className="value">{field.value}</span>
							{'\n'}
						</span>
					);
				} else { // datafield
					var subfieldNodes = field.subfields.map(function(subfield, index) {

						var classes = cx({
							'subfield': true,
							'wasUsed': subfield.wasUsed,
							'fromPreferred': subfield.fromPreferred,
							'fromOther': subfield.fromOther
					  	});

						return (
							<span className={classes}>
								{(index !== 0) ? '       ' : '' }
								<span className="marker"></span>
								<span className="code">{subfield.code}</span>
								<span className="value">{subfield.value}</span>
								{'\n'}
							</span>
						);
					});
					var classes = cx({
						'datafield': true,
						'wasUsed': field.wasUsed,
						'fromPreferred': field.fromPreferred,
						'fromOther': field.fromOther
				  	});

				  	var i1 = field.ind1 || ' ';
				  	var i2 = field.ind2 || ' ';

					return (
						<span className={classes}>
							<span className="tag">{field.tag}</span>
							<span className="pad"> </span>
							<span className="ind1">{i1}</span>
							<span className="ind2">{i2}</span>
							<span className="pad"> </span>
							{subfieldNodes}
						</span>
					);
				} 
			});

			return (
				<div className="fieldList">
					{fieldNodes}
				</div>
			);
		}
	});

	var RecordView = React.createClass({

		render: function() {

		 	return (
		 		<div className="record">
					<FieldList record={this.props.record}/>
				</div>
			);

		}
	});


	return RecordView;
}));