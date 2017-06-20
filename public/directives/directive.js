/**
 * Created by lxthinh on 5/18/2017.
 */



app.directive('listProduct', ['CartStorage', function (CartStorage) {
	return {
		scope: {
			products: '=listProduct',
			showAddCartModal: '&showAddCartModal',
			showQuickViewModal: '&showQuickViewModal',
			viewGrid: "="
		},
		restrict: "A",
		templateUrl: 'views/partials/list-product.html',
		link: function (scope) {
			scope.onSelect = function (product) {
				var cart = {
					imageUrl: product.image.url,
					quanlity: 1,
					maxQty: product.qty,
					name: product.name,
					product: product.slug,
					price: product.price
				};
				var isAddCart = CartStorage.addCart(cart);
				scope.$parent['order'] = CartStorage.getBySlug(product.slug);
				scope.$parent['order']['success'] = isAddCart;
				scope.showAddCartModal();
			};
			scope.$watch('products', function ($new) {
				if ($new !== undefined) {
					$('.ajax_block_product').hover(function () {
						var $self = $(this);
						$self.find('.replace-2x').animate({
							opacity: 0
						});
						$(this).find('.hover-image').animate({
							opacity: 1
						});

					}, function () {
						var $self = $(this);
						$self.find('.hover-image').animate({
							opacity: 0
						});
						$(this).find('.replace-2x').animate({
							opacity: 1
						});
					});


				}

			});

			scope.quickView = function (product) {
				scope.showQuickViewModal({'product': product});
			}

		}
	}
}]);

app.directive('cartModal', ['$location', function ($location) {
	return {
		scope: {
			order: '=ngOrder'
		},
		restrict: 'E',
		templateUrl: 'views/partials/cart-modal.html',
		link: function (scope, element, attrs) {
			element = $(element).find('#addCartModal');
			scope.hideModal = function () {
				$(element).modal('hide');
			};
			scope.$parent.$watch(attrs.visible, function (value) {
				if (value == true) {
					$(element).modal('show');
				} else {
					$(element).modal('hide');
				}
			});
			scope.checkout = function () {
				$(element).modal('hide');
				setTimeout(function () {
					scope.$apply(function () {
						$location.path("/checkout");
					});
				}, 200);

			};
			$(element).on('shown.bs.modal', function () {
				scope.$apply(function () {
					scope.$parent[attrs.visible] = true;
				});
			});

			$(element).on('hidden.bs.modal', function () {
				scope.$apply(function () {
					scope.$parent[attrs.visible] = false;
				});
			});
		}
	}
}]);

app.directive('quickViewModal', ['CartStorage', function (CartStorage) {
	return {
		scope: {
			product: '=ngProduct',
			addCart: '&addCart'
		},
		restrict: 'E',
		templateUrl: 'views/partials/quick-view-modal.html',
		link: function (scope, element, attrs) {
			element = $(element).find('.modal');
			scope.hideModal = function () {
				$(element).modal('hide');
			};
			scope.$parent.$watch(attrs.visible, function (value) {
				if (value == true) {
					$(element).modal('show');
				} else {
					$(element).modal('hide');
				}
			});
			$(element).on('shown.bs.modal', function () {
				scope.$apply(function () {
					scope.$parent[attrs.visible] = true;
				});
			});

			$(element).on('hidden.bs.modal', function () {
				scope.$apply(function () {
					scope.$parent[attrs.visible] = false;
				});
			});

			scope.quanlity = 1;
			scope.addQuanlity = function () {
				if (scope.quanlity < scope.product.qty) {
					scope.quanlity += 1;
				}
			};

			scope.subtractQuanlity = function () {
				if (scope.quanlity > 1) {
					scope.quanlity -= 1;
				}
			};

			scope.addCartModal = function (product) {
				var cart = {
					imageUrl: product.image.url,
					quanlity: scope.quanlity,
					maxQty: product.qty,
					name: product.name,
					product: product.slug,
					price: product.price
				};
				scope.quanlity = 1;
				var isAddCart = CartStorage.addCart(cart);
				var order = CartStorage.getBySlug(product.slug);
				order['success'] = isAddCart;
				scope.addCart({'order': order});
			};


			scope.$watch('product', function (newProduct) {
				if (newProduct !== undefined) {
					scope.imageDefault = scope.product.image.url;
				}
			});


			scope.changeImage = function (src) {
				scope.imageDefault = src;
			};


			scope.scrollDown = function () {
				var scrollTop = $('.quick-view#thumbs_list_frame').scrollTop();
				scrollTop -= 81;
				$('.quick-view#thumbs_list_frame').animate({scrollTop: scrollTop}, 700, 'linear');

				if ((scrollTop - 80) <= 0) {
					scope.isScrollDown = false;

				}
				scope.isScrollUp = true;

			};
			scope.scrollUp = function () {

				var scrollTop = $('.quick-view#thumbs_list_frame').scrollTop();

				scrollTop += 81;
				$('.quick-view#thumbs_list_frame').animate({scrollTop: scrollTop}, 700, 'linear');

				var height = $('.quick-view#thumbs_list_frame').offset().top;
				console.log(height);

				if (scrollTop >= height) {
					scope.isScrollUp = false;

				}
				scope.isScrollDown = true;

			};

			scope.isScrollDown = false;
			scope.isScrollUp = true;


		}
	}
}]);


app.directive('star', Star);
function Star() {
	return {
		restrict: 'E',
		scope: {
			star: '='
		},
		templateUrl: 'views/partials/star.html',
		link: function (scope) {
			var input = [];
			for (var i = 1; i <= scope.star; i++) {
				input.push(i);
			}
			scope.starOn = input;
			input = [];
			for (i = (scope.star + 1); i <= 5; i++) {
				input.push(i);
			}
			scope.starOff = input;
		}

	};
}

app.directive('starInput', [function () {
	return {
		restrict: "E",
		scope: {
			star: '='
		},
		templateUrl: 'views/partials/star-input.html',
		link: function (scope) {
			var input = [];
			for (var i = 1; i <= scope.star; i++) {
				input.push(i);
			}
			scope.starOn = input;
			input = [];
			for (i = (scope.star + 1); i <= 5; i++) {
				input.push(i);
			}
			scope.starOff = input;


			scope.hover = function (star) {
				scope.star = star;

				var input = [];
				for (var i = 1; i <= scope.star; i++) {
					input.push(i);
				}
				scope.starOn = input;
				input = [];
				for (i = (scope.star + 1); i <= 5; i++) {
					input.push(i);
				}
				scope.starOff = input;
			}
		}
	}
}]);


app.directive('pagination', [function () {
	return {
		restrict: 'E',
		scope: {
			pageLimit: '=',
			totalProducts: '=',
			onUpdate: '&'
		},
		templateUrl: 'views/partials/pagination.html',
		link: function (scope) {
			scope.currentPage = 1;

			function _initStartEnd() {
				scope.count = scope.totalProducts.length;
				var end = scope.currentPage * scope.pageLimit;
				scope.start = end - scope.pageLimit + 1;
				if (end > scope.count) {
					end = scope.count;
				}
				scope.end = end;
				var products = _range(scope.totalProducts, scope.start, end);
				scope.onUpdate({'products': products});

			}

			function _range(array, start, end) {
				start -= 1;
				var results = [];
				for (var x = start; x < end; x++) {
					var item = array[x];
					if (item) {
						results.push(item);
					}
				}
				return results;
			}

			_initStartEnd();


			scope.$watch('pageLimit', function () {
				_initStartEnd();
			});


			scope.$watch(function () {
				return scope.totalProducts
			}, function () {
				_initStartEnd();
			});


			scope.showAll = function () {
				scope.pageLimit = scope.count;
				scope.currentPage = 1;
				_initStartEnd();

			};
			scope.previousPage = function () {
				if (scope.currentPage != 1) {
					scope.currentPage -= 1;
					_initStartEnd();
				}
			};
			scope.nextPage = function () {
				if (scope.currentPage < scope.pageCount) {
					scope.currentPage += 1;
					_initStartEnd();
				}
			};

			scope.setCurrentPage = function (page) {
				scope.currentPage = page;
				_initStartEnd();
			};


			scope.getPageSize = function () {
				var input = [];
				scope.pageCount = Math.ceil(scope.count / scope.pageLimit);
				for (var i = 1; i <= scope.pageCount; i++) {
					input.push(i);
				}
				return input;
			};


		}
	}
}]);


app.directive('modal', function () {
	return {
		template: '<div class="modal fade">' +
		'<div class="modal-dialog">' +
		'<div class="modal-content">' +
		'<div class="modal-header">' +
		'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
		'<h4 class="modal-title">{{ title }}</h4>' +
		'</div>' +
		'<div ng-transclude></div>' +
		'</div>' +
		'</div>' +
		'</div>',
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: true,
		link: function postLink(scope, element, attrs) {
			scope.title = attrs.title;

			scope.$watch(attrs.visible, function (value) {
				if (value == true) {
					$(element).modal('show');
				}
				else {
					$(element).modal('hide');
				}
			});

			$(element).on('shown.bs.modal', function () {
				scope.$apply(function () {
					scope.$parent[attrs.visible] = true;
				});
			});

			$(element).on('hidden.bs.modal', function () {
				scope.$apply(function () {
					scope.$parent[attrs.visible] = false;
				});
			});
		}
	};
});
