var async = require('async'),
	keystone = require('keystone');

var Post = keystone.list('Post');
var PostComment = keystone.list('PostComment');

/**
 * Get Comments by Post
 */
exports.list = function (req, res) {
	Post.model.findOne().where('slug', req.params.slug).exec(function (err, item) {

		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');

		var post = item;

		PostComment.model.find().populate('author').where('post', post).exec(function (err, items) {
			if (err) return res.apiError('database error', err);
			if (!items || items.length === 0) return res.apiError('not found');

			res.apiResponse(
				items
			);
		});
	});
};

/**
 * Create a Comment for post
 */
exports.create = function (req, res) {
	if (!req.user) {
    return res.status(401).json({
      message: 'Sorry, user not found, please signin to make a comment.'
    });
	}

	var item = new PostComment.model();
	item.author = req.user;
	item.content = req.body.content;
	Post.model.findOne().where('slug', req.body.post).exec(function (err, post) {
		item.post = post;
		item.save(function (err) {
			if (err) return res.apiError('error', err);

			res.apiResponse(
				item
			);
		});
	});
};
