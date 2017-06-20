var async = require('async'),
  keystone = require('keystone');

var User = keystone.list('User');

/**
 * Get Comments by Product
 */
exports.currentUser = function(req, res) {
  return res.json({
    user: req.user
  })
};

/**
 * Create a Comment for Product
 */
exports.create = function(req, res) {
	var item = new User.model();
  item.email = req.body.email;
  item.address = req.body.address;
  item.phone = req.body.phone;
  item.name.first = req.body.firstName;
  item.name.last = req.body.lastName;
  item.password = req.body.password;
  item.isAdmin = false;
  item.save(function(err) {
    if (err) return res.apiError('error', err);
    res.apiResponse(
      item
    );
  });
};
