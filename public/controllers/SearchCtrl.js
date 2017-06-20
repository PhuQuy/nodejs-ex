/**
 * Created by lxthinh on 5/23/2017.
 */
app.controller('SearchCtrl', ['$routeParams', '$scope', 'Product', function ($routeParams, $scope, Product) {

	$scope.$parent.seo = {
		pageTitle: 'Tìm kiếm từ khóa ' + $routeParams.q,
		pageDescription: 'Tìm sản phẩm'
	};


	$scope.viewGrid = true;

	$scope.changeView = function ($view) {
		if ($view == 'grid') {
			$scope.viewGrid = true;
		} else {
			$scope.viewGrid = false;
		}
	};
	$scope.q = $routeParams.q;

	Product.search({
		name: $routeParams.q
	}, function (products) {
		$scope.totalProducts = products;
	});


	$scope.pagination = {
		pageLimit: 6
	};

	$scope.orderBy = 'position:asc';

	$scope.changeOrder = function () {
		console.log('order', $scope.orderBy);
		var order = $scope.orderBy;
		$scope.totalProducts.map(function(item){
			products.push(item);
		});
		
		console.log(products);

		if (order === 'price:asc') {
			products.sort(function (a, b) {
				return a.price - b.price;
			});

			$scope.totalProducts = products;
		} else if (order === 'price:desc') {
			products.sort(function (b, a) {
				return a.price - b.price;
			});

			$scope.totalProducts = products;
		} else if (order === 'name:desc') {
			products.sort(function (a, b) {
				if (a.name > b.name) {
					return -1;
				} else {
					return 1;
				}
			});

			$scope.totalProducts = products;
		} else if (order === 'name:asc') {
			products.sort(function (b, a) {
				if (a.name > b.name) {
					return -1;
				} else {
					return 1;
				}
			});

			$scope.totalProducts = products;
		} else {
			Product.search({
				name: $routeParams.q
			}, function (products) {
				$scope.totalProducts = products;
			});
		}
	};


	$scope.updateProduct = function (products) {
		$scope.products = products;
	};

	$scope.isShowModal = false;
	$scope.isQuickViewModal = false;

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
