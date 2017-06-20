/**
 * Created by lxthinh on 5/27/2017.
 */
app.controller('LoginCtrl', function($scope, User,$location){
	$scope.isSuccess = true;
	$scope.isLogin = User.isLogin();

	if($scope.isLogin){
		$scope.user = User.getUser();

	}


	$scope.onLogin= function(){
		var user= {'email':$scope.email, 'password':$scope.password};
		User.signin(user, function(response){
			$scope.isSuccess= response;
			if(response==true){
				$scope.user = User.getUser();
				$location.path('/');
			}
			$scope.password= "";
			$scope.isLogin = response;
		})
	};
	$scope.signout= function(){
		User.signout(function(response){
			$scope.email ='';
			$scope.isLogin= false;
			$scope.isSuccess = true;
		});

	}
});
