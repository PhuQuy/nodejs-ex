'use strict';

var postServices = angular.module('postServices', ['ngResource']);

postServices.factory('Post', ['$resource',
	function ($resource) {
		return $resource('api/posts/:slug', {}, {
			query: {
				method: 'GET',
				isArray: true
			},
			getSlide: {
				method: 'GET',
				isArray: true,
				url: '/api/posts/slide'
			}
		});
	}
]);

postServices.factory('PostComment', ['$resource',
	function ($resource) {
		return $resource('/api/comments/post/:slug', {}, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);

postServices.factory('ProductComment', ['$resource',
	function ($resource) {
		return $resource('/api/comments/product/:slug', {}, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);

postServices.factory('Category', ['$resource',
	function ($resource) {
		return $resource('api/categories/:key', {}, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);

postServices.factory('Product', ['$resource',
	function ($resource) {
		return $resource('api/products/:slug', {}, {
			query: {
				method: 'GET',
				isArray: true
			},
			byCategory: {
				method: 'GET',
				isArray: true,
				url: 'api/categories/:key/products'
			},
			search: {
				method: 'GET',
				isArray: true,
				url: 'api/products/search/:name'
			}
		});
	}
]);

postServices.factory('Booking', ['$resource', function ($resource) {
	return $resource('api/bookings/:key', {}, {
		query: {
			method: 'GET',
			isArray: true
		}
	});
}]);


//tags
postServices.factory('Tag', ['$resource',
	function ($resource) {
		return $resource('api/tags/:key', {}, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);

//Informations
postServices.factory('Information', ['$resource',
	function ($resource) {
		return $resource('api/information', {}, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);

//shippings
postServices.factory('Shipping', ['$resource',
	function ($resource) {
		return $resource('api/shippings', {}, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);

postServices.service('CartStorage', ['$window', '$rootScope', function ($window, $rootScope) {
	this.addCart = function (cart) {
		var result = true;
		var carts;
		if (!$window.localStorage['carts']) {
			carts = [];
		} else {
			carts = angular.fromJson($window.localStorage['carts']);
		}
		if (carts.length == 0) {
			carts = [cart];
		} else {
			var index = checkExistCart(carts, cart.product);
			if (index == -1) {
				carts.push(cart);
			} else {
				var quanlity = carts[index].quanlity;
				var maxQty = carts[index].maxQty;
				quanlity = quanlity + cart.quanlity;
				if (quanlity <= maxQty) {
					carts[index].quanlity = quanlity;
				} else {
					result = false;
				}
			}
		}

		$window.localStorage['carts'] = angular.toJson(carts);
		$rootScope.$broadcast('changeCart', {});
		return result;

	};

	this.getBySlug = function (slug) {
		var carts = angular.fromJson($window.localStorage['carts']);
		var index = checkExistCart(carts, slug);
		var totalProducts = 0;
		angular.forEach(carts, function (cart) {
			totalProducts += cart.quanlity * cart.price;
		});
		return {'cart': carts[index], 'totalProducts': totalProducts, 'shipping': 0, 'lengthItem': carts.length};
	};

	this.removeCart = function (index) {
		var carts = angular.fromJson($window.localStorage['carts']);
		carts.splice(index, 1);
		$window.localStorage['carts'] = angular.toJson(carts);
		$rootScope.$broadcast('changeCart', {});
	};
	this.getAll = function () {
		var carts;
		if (!$window.localStorage['carts']) {
			carts = [];
		} else {
			carts = angular.fromJson($window.localStorage['carts']);
		}
		var totalProducts = 0;
		angular.forEach(carts, function (cart) {
			totalProducts += cart.quanlity * cart.price;
		});
		return {'carts': carts, 'totalProducts': totalProducts, 'shipping': 0};
	};

	this.updateQuanlity = function (index, quanlity) {
		var carts = angular.fromJson($window.localStorage['carts']);
		carts[index].quanlity = quanlity;
		$window.localStorage['carts'] = angular.toJson(carts);
		$rootScope.$broadcast('changeCart', {});
	};

	this.removeAll = function () {
		$window.localStorage['carts'] = angular.toJson([]);
		$rootScope.$broadcast('changeCart', {});
	};

	function checkExistCart(carts, product) {
		for (var i = 0; i < carts.length; i++) {
			if (carts[i].product == product) {
				return i;
			}
		}
		return -1;
	}

}]);

postServices.service('User', ['Authentication', '$window', function (Authentication, $window) {
	this.signin = function (user, callback) {
		Authentication.save(user, function (response) {
			if (response.success) {
				var now = new Date();
				now.setDate(now.getDate() + 2);
				response.user['exp'] = now.getTime();
				$window.localStorage['user'] = angular.toJson(response.user);
			} else {
				$window.localStorage['user'] = "";
			}
			callback(response.success);
		});
	};
	this.signout = function (callback) {
		Authentication.signout(function (response) {
			$window.localStorage['user'] = '';
			callback(response.success);
		});
	};
	this.isLogin = function () {
		var user = $window.localStorage['user'];
		if (user == undefined || user == null || user == '') {
			return false;
		} else {
			var exp = user['exp'];
			var now = new Date();
			if (now.getTime() > exp) {
				$window.localStorage['user'] = "";
				return false
			}
		}
		return true;
	};
	this.getUser = function () {
		return angular.fromJson($window.localStorage['user']);
	}
}]);


postServices.factory('PostCategory', ['$resource',
	function ($resource) {
		return $resource('api/post-category/:key', {}, {
			query: {
				method: 'GET',
				params: {
					key: 'list'
				},
				isArray: true
			}
		});
	}
]);

postServices.factory('PostByCategory', ['$resource',
	function ($resource) {
		return $resource('api/post-by-category/:key', {}, {
			query: {
				method: 'GET',
				isArray: true
			}
		});
	}
]);

postServices.factory('Gallery', ['$resource',
	function ($resource) {
		return $resource('api/gallery/:key', {}, {
			query: {
				method: 'GET',
				params: {
					key: 'list'
				},
				isArray: true
			}
		});
	}
]);

postServices.factory('Enquiry', ['$resource',
	function ($resource) {
		return $resource('api/enquiry/:key', {}, {
			query: {
				method: 'GET',
				params: {
					key: 'list'
				},
				isArray: true
			},
			create: {
				method: 'POST',
				params: {
					key: 'create'
				},
				isArray: false
			}
		});
	}
]);

postServices.factory('UserApi', ['$resource',
	function ($resource) {
		return $resource('api/user/:key', {}, {
			query: {
				method: 'GET',
				params: {
					key: 'current'
				},
				isArray: true
			},
			create: {
				method: 'POST',
				params: {
					key: 'create'
				},
				isArray: false
			}
		});
	}
]);

postServices.factory('EnquiryType', ['$resource',
	function ($resource) {
		return $resource('api/enquiry_type/:key', {}, {
			query: {
				method: 'GET',
				params: {
					key: 'list'
				},
				isArray: true
			}
		});
	}
]);

//Auth
postServices.factory('Authentication', ['$resource', function ($resource) {
	return $resource('api/authentication/:action', {action: '@action'},
		{
			signout: {
				method: "DELETE",
				params: {action: 'signout'}
			}
		}
	);
}]);
