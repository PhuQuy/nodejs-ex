/**
 * Created by lxthinh on 5/18/2017.
 */
app.controller('CheckoutCtrl', ['Shipping', '$scope', 'CartStorage', 'Booking', 'User', function (Shipping, $scope, CartStorage, Booking, User) {

	$scope.$parent.seo = {
		pageTitle: 'Thanh toán đơn hàng',
		pageDescription: 'Thanh toán đơn hàng'
	};


	$scope.step = 1;
	$scope.info = {};

	$scope.showModalShip = false;

	$scope.showShipDetail = function () {
		$scope.showModalShip = true;
	};

	Shipping.query(function (shippings) {
		$scope.shippings = shippings;
	});

	$scope.goStep = function (step) {
		if ($scope.step > step) {
			$scope.step = step;
		}
	};

	$scope.onStep = function () {

		if ($scope.step == 2) {


			$scope.info['name'] = $scope.info['firstName'] + $scope.info['lastName'];
			$scope.info['cart'] = $scope.order['carts'];
			Booking.save($scope.info, function (success) {
				$scope.payment = $scope.order.totalProducts + $scope.order.shipping;
				CartStorage.removeAll();
				$scope.step += 1;
			}, function (err) {
				console.log(err);

			});
		} else {
			if (User.isLogin()) {
				var user = User.getUser();
				$scope.info = user;
				$scope.info['firstName'] = user.name.first;
				$scope.info['lastName'] = user.name.last;
			}


			$scope.step += 1;
		}
	};

	function init() {
		$scope.order = CartStorage.getAll();
	}

	init();

	$scope.$on('changeCart', function () {
		init();
	});


	$scope.removeCart = function ($index) {
		CartStorage.removeCart($index);
	};

	$scope.subtractQuanlity = function ($index) {
		var quanlity = $scope.order.carts[$index].quanlity;
		quanlity -= 1;
		if (quanlity > 0) {
			CartStorage.updateQuanlity($index, quanlity);
		}


	};
	$scope.addQuanlity = function ($index) {
		var quanlity = $scope.order.carts[$index].quanlity;
		var maxQty = $scope.order.carts[$index].maxQty;
		quanlity += 1;
		if (quanlity <= maxQty) {
			CartStorage.updateQuanlity($index, quanlity);
		}
	};


}]);
