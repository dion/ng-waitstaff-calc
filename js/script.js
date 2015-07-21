	angular.module('myApp', ['ngRoute', 'ngAnimate'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'home.html',
			controller: 'HomeCtrl as home'
		})
		.when('/new-meal', {
			templateUrl: 'new-meal.html',
			controller: 'NewCtrl as newMeal'
		})
		.when('/my-earnings', {
			templateUrl: 'my-earnings.html',
			controller: 'EarningsCtrl as earnings'
		})
		.when('/error', {
			template: '<p>Error - Page Not Found</p>'
		})
		.otherwise('/error');
	}])
	.run(function($rootScope, $location) {
	    $rootScope.$on('$routeChangeError', function() {
	        $location.path('/error');
	    });
	})
	.controller('HomeCtrl', function ($scope) {

	})
	.controller('NewCtrl', function ($rootScope) {
		$rootScope.mealData = {
			basePrice: null,
			taxRate: null,
			tipPercentage: null,
			subtotal: 0,
			tipAmount: 0,
			total: 0
		};

		$rootScope.earningsInfo = {
			tipTotal: 0,
			mealCount: 0,
			avgTipPerMeal: 0
		};

		this.submit = function () {
			var taxRateToDecimal = $rootScope.mealData.taxRate / 100,
			    tipRateToDecimal = $rootScope.mealData.tipPercentage / 100,
				taxAmount = $rootScope.mealData.basePrice * taxRateToDecimal,
				tipAmount = $rootScope.mealData.basePrice * tipRateToDecimal;

			$rootScope.mealData.subtotal = $rootScope.mealData.basePrice + taxAmount;
			$rootScope.mealData.taxAmount = taxAmount;
			$rootScope.mealData.tipAmount = tipAmount;
			$rootScope.mealData.total = $rootScope.mealData.subtotal + $rootScope.mealData.tipAmount;

			$rootScope.earningsInfo.tipTotal += $rootScope.mealData.tipAmount;
			$rootScope.earningsInfo.mealCount++;
			$rootScope.earningsInfo.avgTipPerMeal = $rootScope.earningsInfo.tipTotal / $rootScope.earningsInfo.mealCount;
		};
	})
	.controller('EarningsCtrl', function ($rootScope) {
		this.reset = function () {
			this.clearObj($rootScope.mealData);
			this.clearObj($rootScope.earningsInfo);
		};

		this.clearObj = function (obj) {
			for (i in obj) {
				obj[i] = 0;
			}
		};
	});