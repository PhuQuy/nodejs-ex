/**
 * Created by lxthinh on 5/19/2017.
 */
app.controller('CategoryCtrl', ['$scope', '$routeParams', 'Product', 'Category', function ($scope, $routeParams, Product, Category) {


	$scope.viewGrid = true;

	$scope.orderBy = 'position:asc';

	$scope.changeView = function ($view) {
		if ($view == 'grid') {
			$scope.viewGrid = true;
		} else {
			$scope.viewGrid = false;
		}
	};

	Category.get({
		key: $routeParams.category
	}, function (category) {
		$scope.category = category;

		$scope.$parent.seo = {
			pageTitle: $scope.category.name,
			pageDescription: $scope.category.description
		};


		$(document).on('click', '.lnk_more', function (e) {
			e.preventDefault();
			$('#category_description_short').hide();
			$('#category_description_full').show();
			$(this).hide();
		});
	});


	$scope.pagination = {
		pageLimit: 3
	};


	Product.byCategory({key: $routeParams.category}, function (products) {
		$scope.totalProducts = products;

	});

	$scope.updateProduct = function (products) {
		$scope.products = products;
	};


	$scope.changeOrder = function () {
		console.log('------===log ', $scope.orderBy);

		var order = $scope.orderBy;
		var products = [];
		$scope.totalProducts.map(function(item){
			products.push(item);
		});

		if (order === 'price:asc') {
			products.sort(function(a, b) {
				return a.price - b.price;
			});

			$scope.totalProducts = products;
		} else if (order === 'price:desc') {
			products.sort(function(b, a) {
				return a.price - b.price;
			});

			$scope.totalProducts = products;
		} else if (order === 'name:desc') {
			products.sort(function(a, b) {
				if(a.name > b.name) {
					return -1;
				} else {
					return 1;
				}
			});

			$scope.totalProducts = products;
		} else if (order === 'name:asc') {
			products.sort(function(b, a) {
				if(a.name > b.name) {
					return -1;
				} else {
					return 1;
				}
			});

			$scope.totalProducts = products;
		} else {
			Product.byCategory({key: $routeParams.category}, function (products) {
				$scope.totalProducts = products;
			});
		}






	};

	$scope.refresh = function () {
		Product.byCategory({key: $routeParams.category, sort: 'price', sortValue: -1}, function (products) {
			$scope.totalProducts = products;
		});
	};

	$scope.isQuickViewModal = false;
	$scope.isShowModal = false;
	$scope.showAddCart = function () {
		$scope.isShowModal = true;
	};

	$scope.showQuickView = function (product) {
		$scope.isQuickViewModal = true;
		$scope.product = product;
		console.log(product);
	};
	$scope.addCard = function (order) {
		$scope.isQuickViewModal = false;
		$scope.isShowModal = true;
		$scope.order = order;
	}


}]);
