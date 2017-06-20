/**
 * Created by lxthinh on 5/18/2017.
 */
app.controller('NavCtrl', ['Tag', 'Category', 'Product', '$scope', '$location', function (Tag, Category, Product, $scope, $location) {

	$scope.isShow = true;

	checkShowNav($location.path());

	$scope.$on('$routeChangeStart', function () {
		checkShowNav($location.path());
	});


	$scope.isActiveLink= function(url){
		var strLocation = $location.path();
		return strLocation.split("/")[2] == url;
	};

	function checkShowNav(path) {
		var $arrNotShowNav = ['/contact', '/checkout'];
		if ($arrNotShowNav.indexOf(path) > -1) {
			$scope.isShow = false;
		} else {
			$scope.isShow = true;
		}
	}

	Category.query(function (categories) {
		$scope.categories = categories;
	});

	$scope.openCategories = function (e) {
		var self = e.currentTarget;
		var subUl = $(self).nextAll('ul');
		if (subUl.is(':hidden')) {
			subUl.slideDown();
			$(self).addClass('OPEN');
			$(self).removeClass('CLOSE');
		} else {
			subUl.slideUp();
			$(self).removeClass('OPEN');
			$(self).addClass('CLOSE');
		}
	};

	$scope.topSellers = Product.query({'q':'bestSeller'});

	$scope.tags = Tag.query();

	$scope.onSearch = function (query) {
		$location.path('/search').search({q: query});
	}
}]);
