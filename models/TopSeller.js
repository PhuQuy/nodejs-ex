var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * TopSeller Model
 * =============
 */

var TopSeller = new keystone.List('TopSeller', {
	map: { name: 'name' },
	autokey: {
		from: 'name',
		path: 'slug',
		unique: true
	},
});

TopSeller.add({
	name: {
		type: String,
		required: true
	},
	image: { type: Types.CloudinaryImage },
	price: {type: Number},
	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 300
	},
	categories: { type: Types.Relationship, ref: 'Category', many: true },
});

TopSeller.register();
