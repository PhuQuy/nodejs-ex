var async = require('async'),
	keystone = require('keystone');

var Booking = keystone.list('Booking');
var Product = keystone.list('ProductItem');
var Cart = keystone.list('Cart');


/**
 * Create a Booking
 */
exports.create = function(req, res) {

	// var data = (req.method == 'POST') ? req.body : req.query,
	//   item = new Booking.model(data);
	item = new Booking.model();
	var data = req.body;
	item.name = data.name;
	item.email = data.email;
	item.phone = data.phone;
	item.address = data.address;
	var cart = [];
	data.cart.forEach(function(element) {
		Product.model.findOne().where('slug', element.product).exec(function(err, product) {
			var cartItem = new Cart.model();
			cartItem.quantity = element.quanlity;
			cartItem.product = product;
			cartItem.save(function(err) {
				if (err) return res.apiError('error', err);
			});
			cart.push(cartItem);
			item.cart = cart;
      if(cart.length === data.cart.length) {
        item.save(function(err) {
  				if (err) return res.apiError('error', err);

  				res.apiResponse(
  					item
  				);
  			});
      }
		});
	});
};
