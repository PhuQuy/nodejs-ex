/**
 * Created by lxthinh on 5/25/2017.
 */

app.controller('BlogCtrl', ['$sce', '$scope', 'Post', '$routeParams', function($sce, $scope, Post) {

	$scope.$parent.seo = {
		pageTitle :'Tin tức mới' ,
		pageDescription: 'Nhiều thông tin bổ ích cho mọi người'
	};
	
	$scope.blogs = [];
	Post.query(function(posts) {
		$scope.totalPosts = posts;
	}, function(err) {
		console.log('err', err);
	});

	$scope.active = function() {
		return "active";
	};

	Post.getSlide(function(posts) {
		$scope.posts = posts;

	}, function(err) {
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

	$scope.updatePost = function (posts) {
		$scope.blogs = posts;
	};


}]);
