/**
 * Created by lxthinh on 5/18/2017.
 */

'use strict';


var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngSanitize', 'postServices'])


	.filter('limitString', function () {
		return function (str, type) {
			if (str == undefined || str == '') {
				return 'Không có mô tả'
			}
			var length = 1000;
			if (type == "short") {
				length = 200;
			} else if (type == 'medium') {
				length = 400;
			}


			var $element = $(str);

			var $sub = $('<span></span>');
			var len = 0;
			$element.children().each(function () {
				len += $(this).text().length;
				if (len <= length) {
					$sub.append($(this));
				}
			});
			return $sub.append("<span>...</span>").html();
		}

	})


	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl'
			})
			.when('/contact', {
				templateUrl: 'views/contact.html',
				controller: 'ContactCtrl'
			})
			.when('/checkout', {
				templateUrl: 'views/checkout.html',
				controller: 'CheckoutCtrl'
			})
			.when('/categories/:category', {
				templateUrl: '/views/category.html',
				controller: 'CategoryCtrl'
			})
			.when('/products/:slug', {
				templateUrl: 'views/detail.html',
				controller: 'DetailCtrl'
			})
			.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'RegisterCtrl'
			})
			.when('/error404', {
				templateUrl: 'views/errors/404.html'
			})
			.when('/search', {
				templateUrl: 'views/search.html',
				controller: 'SearchCtrl'
			})
			.when('/blogs', {
				templateUrl: 'views/blog.html',
				controller: 'BlogCtrl'
			})
			.when('/blogs/:slug', {
				templateUrl: 'views/blogDetail.html',
				controller: 'BlogDetailCtrl'
			})
			.otherwise({
				redirectTo: "/"
			});

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
		$locationProvider.hashPrefix('!');


	}]);


app.controller('mainCtrl', function($scope){
	$scope.seo = {
		pageTitle : '', pageDescription : ''
	};
});
