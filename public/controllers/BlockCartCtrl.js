/**
 * Created by lxthinh on 5/23/2017.
 */

app.controller('BlockCartCtrl', function ($scope, CartStorage) {


	$scope.isHide = true;
	$scope.$on('$routeChangeStart', function () {
		$scope.isHide = true;
	});
	$scope.showBlockCart = function () {
		$scope.isHide = !$scope.isHide;

	};
	
	
	
	function init(){
		$scope.order  =  CartStorage.getAll();
	}
	init();
	$scope.$on('changeCart', function(){
		init();
	});

	$scope.removeCart = function ($index) {
		CartStorage.removeCart($index);
	} ;
	
	


});
