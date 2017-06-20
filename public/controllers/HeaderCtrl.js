/**
 * Created by lxthinh on 5/23/2017.
 */
app.controller('HeaderCtrl', function ($scope, $location) {
	$scope.onSearch = function () {
		$location.path('/search').search({q: $scope.search});
	};
	dropDown();
	
	$scope.home = "/";
	$scope.blog = "/blogs";
	$scope.contact = "/contact";

	$scope.isActiveLink= function(url){
		var strLocation = $location.path();
		return strLocation === url;
	};
});
