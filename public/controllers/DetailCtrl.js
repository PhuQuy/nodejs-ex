/**
 * Created by lxthinh on 5/22/2017.
 */
app.controller('DetailCtrl', ['$scope', '$routeParams', 'Product', 'CartStorage', '$sce', 'ProductComment', 'User', function ($scope, $routeParams, Product, CartStorage, $sce, ProductComment, User) {

	$scope.quanlity = 1;
	$scope.isLogin = User.isLogin();
	$scope.comments = [];

	var slug = $routeParams.slug;

	$scope.addQuanlity = function () {
		if ($scope.quanlity < $scope.product.qty) {
			$scope.quanlity += 1;
		}
	};

	$scope.subtractQuanlity = function () {
		if ($scope.quanlity > 1) {
			$scope.quanlity -= 1;
		}
	};

	$scope.addCart = function () {
		$scope.isShowModal = true;
		var cart = {
			imageUrl: $scope.product.image.secure_url,
			quanlity: $scope.quanlity,
			maxQty: $scope.product.qty,
			name: $scope.product.name,
			product: $scope.product.slug,
			price: $scope.product.price
		};
		var isAddCart = CartStorage.addCart(cart);
		$scope.order = CartStorage.getBySlug($scope.product.slug);
		$scope.order['success'] = isAddCart;
	};


	$scope.scrollDown = function () {
		var scrollTop = $('#thumbs_list_frame').scrollTop();
		scrollTop -= 81;
		$('#thumbs_list_frame').animate({scrollTop: scrollTop}, 700, 'linear');

		if ((scrollTop - 80) <= 0) {
			$scope.isScrollDown = false;
			
		}
		$scope.isScrollUp = true;

	};
	$scope.scrollUp = function () {

		var scrollTop = $('#thumbs_list_frame').scrollTop();

		scrollTop += 81;
		$('#thumbs_list_frame').animate({scrollTop: scrollTop}, 700, 'linear');

		var height = $('#thumbs_list_frame').offset().top;
		
		if ((scrollTop ) >= height) {
			$scope.isScrollUp = false;

		}
		$scope.isScrollDown = true;

	};

	$scope.isScrollDown = false;
	$scope.isScrollUp = true;


	Product.get({
		slug: $routeParams.slug
	}, function (product) {
		$scope.product = product;

		$scope.$parent.seo = {
			pageTitle: product.name,
			pageDescription: product.description
		};


		$scope.product.imageDefault = product.image.secure_url;

		$scope.products = [];
		Product.query({q: "accessories", "key": product.slug}, function (products) {
			$scope.products = products;
		});

	});


	$scope.changeImage = function (url) {
		$scope.product.imageDefault = url;
	};

	ProductComment.query({'slug': slug}, function (comments) {
		$scope.totalComments = comments;
	});

	$scope.star = 3;
	$scope.onComment = function () {
		var comment = {
			'product': slug,
			'star': $scope.star,
			'content': $scope.content
		};
		ProductComment.save(comment, function (comment) {
			$scope.comments.push(comment);
			$scope.content = '';
		})

	};

	$scope.updateComment = function (products) {
		$scope.comments = products;
	};

	$scope.trustSrc = function (src) {
		return $sce.trustAsResourceUrl(src);
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
	$scope.addCardModal = function (order) {
		$scope.isQuickViewModal = false;
		$scope.isShowModal = true;
		$scope.order = order;
	}


}]);
