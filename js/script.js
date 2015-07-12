	angular.module('myApp', [])
	.controller('waitstaffCalc', function ($scope) {
		$scope.mealData = {
			basePrice: null,
			taxRate: null,
			tipPercentage: null,
			subtotal: 0,
			tipAmount: 0,
			total: 0
		};

		$scope.earningsInfo = {
			tipTotal: 0,
			mealCount: 0,
			avgTipPerMeal: 0
		};

		$scope.reset = function () {
			$scope.clearObj($scope.mealData);
			$scope.clearObj($scope.earningsInfo);
		};

		$scope.clearObj = function (obj) {
			for (i in obj) {
				obj[i] = 0;
			}
		};

		$scope.submit = function () {
			var taxRateToDecimal = $scope.mealData.taxRate / 100,
			    tipRateToDecimal = $scope.mealData.tipPercentage / 100,
				taxAmount = $scope.mealData.basePrice * taxRateToDecimal,
				tipAmount = $scope.mealData.basePrice * tipRateToDecimal;

			$scope.mealData.subtotal = $scope.mealData.basePrice + taxAmount;
			$scope.mealData.taxAmount = taxAmount;
			$scope.mealData.tipAmount = tipAmount;
			$scope.mealData.total = $scope.mealData.subtotal + $scope.mealData.tipAmount;

			$scope.earningsInfo.tipTotal += $scope.mealData.tipAmount;
			$scope.earningsInfo.mealCount++;
			$scope.earningsInfo.avgTipPerMeal = $scope.earningsInfo.tipTotal / $scope.earningsInfo.mealCount;
		};
	});