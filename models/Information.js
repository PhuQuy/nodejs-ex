var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Information Model
 * ==========
 */
var Information = new keystone.List('Information');

Information.add({
	email: { type: Types.Email },
	phone: { type: String },
	address: { type: String },
	terms: {type: Types.Html, wysiwyg: true, height:300},
	location: {
		lat: { type: Types.Number },
		long: { type: Types.Number },
	},
	aboutUs: {type: Types.Html, wysiwyg: true, height:300},
	delivery: {type: Types.Html, wysiwyg: true, height:300},
	facebook: {type: Types.Url},
	twitter: {type: Types.Url},
	rss: {type: Types.Url}
});


/**
 * Registration
 */
Information.register();
