/**
 * Created by lxthinh on 5/18/2017.
 */


app.controller('ContactCtrl', ['Enquiry', '$scope', function (Enquiry, $scope) {

	$scope.$parent.seo = {
		pageTitle : 'Liên lạc',
		pageDescription: 'Welcome to our tutorial on getting your AngularJS websites and apps indexed by Google.'
	};
	
	$scope.contactUs = function () {
		Enquiry.create($scope.contact, function () {
			$scope.step = 2;
		});

	};
	$scope.step = 1;

	$scope.setValue = function() {
		$scope.contact.enquiryType = itemSelected.value;
	};

	$scope.options = [
		{ value: 'message', label: 'Để lại lời nhắn' },
		{ value: 'question', label: 'Để lại câu hỏi' },
		{ value: 'other', label: 'Khác...' },
	];

	$scope.itemSelected = $scope.options[0];


	initMap();

}]);
