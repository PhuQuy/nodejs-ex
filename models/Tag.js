var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * =============
 */

var Tag = new keystone.List('Tag', {
	map: { name: 'name' },
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
});

Tag.add({
	name: {
		type: String,
		required: true
	},
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 300
	},
});

Tag.register();
