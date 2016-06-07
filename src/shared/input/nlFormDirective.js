(function() {
    'use strict';

  angular
  .module('nlForm')
  .directive('nlForm', nlForm);


  function nlForm() {
    return {
      restrict:'EA',
      controller: ['$scope','$element','nlFormService', function($scope,$element,nlFormService) {
        this.element = $element;
        nlFormService.clearActive();
      }]
    }
  }  

})();

