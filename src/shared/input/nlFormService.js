(function() {
    'use strict';

    angular
        .module('nlForm')
        .factory('nlFormService', nlFormService);


    nlFormService.$inject = [];

    function nlFormService() { 

        var activeElement = null;

        function setActive(element) {
            if(activeElement != null) {
                activeElement.removeClass('active');
                if(element != activeElement) {
                    element.addClass('active');
                    activeElement = element;  
                }
                else {
                    activeElement = null;
                }
            }
            else {
                element.addClass('active');
                activeElement = element;  
            }
        }

        function closeActive() {
            if(activeElement != null) {
                activeElement.removeClass('active');
                activeElement = null;
            }
        }

        function getActive() {
            return activeElement;
        }

        function clearActive() {
            activeElement = null;
        }

        return {
            setActive: setActive,
            closeActive: closeActive,
            getActive: getActive,
            clearActive: clearActive
        };

    }


})();