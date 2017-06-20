var async = require('async'),
  keystone = require('keystone');

var Category = keystone.list('Category');

/**
 * List Categories
 */
exports.list = function(req, res) {
  Category.model.find({
    child: false
  }).populate('categories').exec(function(err, items) {

    if (err) return res.apiError('database error', err);
    res.apiResponse(items);

  });
};

/**
 * Get Category by ID
 */
exports.get = function(req, res) {
  Category.model.findOne().where('key', req.params.key).exec(function(err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    res.apiResponse(
      item
    );

  });
};


/**
 * Create a Category
 */
exports.create = function(req, res) {

  var item = new Category.model(),
    data = (req.method == 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(data, function(err) {

    if (err) return res.apiError('error', err);

    res.apiResponse({
      post: item
    });

  });
};

/**
 * Get Category by ID
 */
exports.update = function(req, res) {
  Category.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    var data = (req.method == 'POST') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err) {

      if (err) return res.apiError('create error', err);

      res.apiResponse({
        post: item
      });

    });

  });
};

/**
 * Delete Category by ID
 */
exports.remove = function(req, res) {
  Category.model.findById(req.params.id).exec(function (err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    item.remove(function (err) {
      if (err) return res.apiError('database error', err);

      return res.apiResponse({
        success: true
      });
    });

  });
};
