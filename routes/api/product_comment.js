var async = require('async'),
  keystone = require('keystone');

var ProductItem = keystone.list('ProductItem');
var ProductComment = keystone.list('ProductComment');

/**
 * Get Comments by Product
 */
exports.list = function(req, res) {
  ProductItem.model.findOne().where('slug', req.params.slug).exec(function(err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    var product = item;

    ProductComment.model.find().populate('author').where('product', product).exec(function(err, items) {
      if (err) return res.apiError('database error', err);
      if (!items || items.length === 0) return res.apiResponse([]);

      res.apiResponse(
        items
      );
    });
  });
};

/**
 * Create a Comment for Product
 */
exports.create = function(req, res) {

  if (!req.user) {
    return res.status(401).json({
      message: 'Sorry, user not found, please signin to make a comment.'
    });
	}
	var item = new ProductComment.model();
	item.author = req.user;
	item.content = req.body.content;
  item.star = req.body.star;
	ProductItem.model.findOne().where('slug', req.body.product).exec(function(err, product) {
		item.product = product;
		item.save(function(err) {
			if (err) return res.apiError('error', err);
      item.product = null;
			res.apiResponse(
				item
			);
		});
	});
};
