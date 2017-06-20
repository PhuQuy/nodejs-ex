var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Category Model
 * =============
 */

var Category = new keystone.List('Category', {
	map: { name: 'name' },
	autokey: {
		from: 'name',
		path: 'key',
		unique: true
	},
});

Category.add({
	name: {
		type: String,
		required: true
	},
	image: { type: Types.CloudinaryImage },
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 300
	},
	child: {type: Types.Boolean, default: false },
	categories: { type: Types.Relationship, ref: 'Category', many: true },
});

Category.register();
