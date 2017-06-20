var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
	Posts
	=====
 */

var ProductComment = new keystone.List('ProductComment', {
	label: 'Comments',
});

ProductComment.add({
	author: { type: Types.Relationship, initial: true, ref: 'User', index: true },
	product: { type: Types.Relationship, initial: true, ref: 'ProductItem', index: true },
	commentState: { type: Types.Select, options: ['published', 'draft', 'archived'], default: 'published', index: true },
	publishedOn: { type: Types.Date, default: Date.now, noedit: true, index: true },
});

ProductComment.add('Content', {
	content: { type: Types.Html, wysiwyg: true, height: 300 },
	star: {type: Number},
});

ProductComment.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	if (!this.isModified('publishedOn') && this.isModified('commentState') && this.commentState === 'published') {
		this.publishedOn = new Date();
	}
	next();
});

ProductComment.schema.post('save', function () {
	if (!this.wasNew) return;
	if (this.author) {
		keystone.list('User').model.findById(this.author).exec(function (err, user) {
			if (user) {
				user.wasActive().save();
			}
		});
	}
});

ProductComment.track = true;
ProductComment.defaultColumns = 'author, product, publishedOn, commentState';
ProductComment.register();
