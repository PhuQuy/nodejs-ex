/**
 * Created by lxthinh on 5/25/2017.
 */

app.controller('BlogDetailCtrl', ['$sce', '$scope', 'Post', '$routeParams', 'PostComment','User', function ($sce, $scope, Post, $routeParams, PostComment,User) {

	$scope.isLogin = User.isLogin();
	$scope.comments= [];
	var slug = $routeParams.slug;
	Post.get({
		slug: $routeParams.slug
	}, function (post) {
		$scope.blog = post;

		$scope.$parent.seo = {
			pageTitle :post.title ,
			pageDescription: post.description
		};
		
	});

	PostComment.query({'slug': slug}, function (totalComments) {
		$scope.totalComments = totalComments;
	});

	$scope.renderHtml = function (html_code) {
		return $sce.trustAsHtml(html_code);
	};

	$scope.updateComment = function (products) {
		$scope.comments = products;
	};

	$scope.onComment = function () {
		var comment = {
			'post': slug,
			'content': $scope.content
		};
		PostComment.save(comment, function (comment) {
			$scope.comments.push(comment);
			$scope.content = '';
		})

	};
}]);
