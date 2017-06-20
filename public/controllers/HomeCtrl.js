'use strict';

app.controller('HomeCtrl', ['$scope', 'Post', 'Product', function ($scope, Post, Product) {

	$scope.$parent.seo = {
		pageTitle : 'Cung cấp sản phẩm sạch',
		pageDescription: 'Welcome to our tutorial on getting your AngularJS websites and apps indexed by Google.'
	};
	
	console.log($scope);

	Post.getSlide(function (posts) {
		$scope.posts = posts;
	}, function (err) {
		console.log('err', err);
	});

	$scope.isFinished = function (isLast) {
		if (isLast) {
			$(document).ready(function () {
				$('#homeslider').bxSlider({
					auto: true,
					autoControls: false,
					controls: false,
					autoStart:true,
					pause:4000
				});
			});
		}
	};

	Product.query(function (products) {
		$scope.products = products;
	}, function (err) {
		console.log('err', err);
	});

	Product.query({'q': 'new'}, function (newProducts) {
		$scope.newProducts = newProducts;
	});

	Product.query({'q': 'bestSeller'}, function (bestSellers) {
		$scope.bestSellers = bestSellers;
	});

	Product.query({'q': 'special'}, function (specials) {
		$scope.specials = specials;
	});

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
