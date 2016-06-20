(function() {
    'use strict';

    angular.module('demo', ['nlForm']);

    /**
    Run app
    */
    angular
        .module('demo')
        .run(runBlock);

    runBlock.$inject = [];

    function runBlock() {

    }


    angular
        .module('demo')
        .controller('demoController',demoController);

    demoController.$inject = ['$scope'];

    function demoController($scope) {
        $scope.todo = 'air vents';
        $scope.name = 'socks';
    }

})();