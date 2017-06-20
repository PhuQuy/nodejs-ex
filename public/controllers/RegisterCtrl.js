/**
 * Created by lxthinh on 5/27/2017.
 */
app.controller('RegisterCtrl', ['UserApi', '$scope', 'User', '$location', function (UserApi, $scope, User, $location) {
	$scope.$parent.seo = {
		pageTitle: 'Đăng kí tài khoản',
		pageDescription: 'Đăng kí dể dàng'
	};
	
	
	if (User.isLogin()) {
		$location.path('/');
	}
	function checkPassword() {
		if ($scope.info.rePassword.length >= 5) {
			if ($scope.info.password != $scope.info.rePassword) {
				$scope.passwordInvalid = true;
			} else {
				$scope.passwordInvalid = false;
			}
		} else {
			$scope.passwordInvalid = false;
		}
	}

	$scope.$watch('info.password', function () {
		checkPassword();
	});
	$scope.$watch('info.rePassword', function () {
		checkPassword();
	});

	$scope.register = function () {
		UserApi.create($scope.info, function (user) {
			alert('Thành công');
		});
	}
}]);
