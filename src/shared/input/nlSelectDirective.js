(function() {
    'use strict';

  angular
  .module('nlForm')
  .directive('nlSelect', nlSelect)
  .directive('nlOption', nlOption);

  nlSelect.$inject = ['$window','nlFormService','$interpolate','$timeout'];

  function nlSelect($window, nlFormService, $interpolate, $timeout) {
    return {
      restrict:'E',
      require: ['ngModel','^^nlForm'],
      transclude: true,
      template: selectTpl,
      link: nlSelectLink,
      controller: nlSelectController,
      scope: {
        selected: "=?"
      },
    }

    nlSelectController.$inject('$scope','$element');

    function nlSelectController($scope,$element) {
        this.optionClicked = function() {
          var ngModel = $element.controller('ngModel');
          if(ngModel.$viewValue != undefined && typeof ngModel.$viewValue === 'object') {
            $scope.selected = ngModel.$viewValue;
            $scope.$apply();
          }
          nlFormService.setActive($element);
        }
    }


    function nlSelectLink($scope, $element, $attr, $ctrls) {

      var OFFSET = 10,
          debounce,
          formElement = $ctrls[1].element,
          buttonElement = angular.element($element.children()[1]),
          listElement = angular.element($element.children()[2]);

      $scope.$watch('selected', function(value){
        updateButton();
      });

      angular.element($window).on('resize',function(){
         $timeout.cancel(debounce);
          debounce = $timeout( function() {
             if($element.hasClass('active')) {
              updatePosition();
             }
          }, $attr.debounce || 200);
      });

      angular.element($window).on('click',function(event){
          var a = nlFormService.getActive();
          // Is current element the active one?
          if(a != null) {
            // Is clicked element child of nlSelect
            // If not a child, must be out in teh windo somewhere so close
            if(childOf(angular.element(event.target),a) === false) {
              nlFormService.closeActive();
            }
          }          
      });

      function childOf(/*child node*/c, /*parent node*/p){ //returns boolean
              c = c[0] || c;
              p = p[0] || p;
              while((c=c.parentNode)&&c!==p); 
              return !!c; 
      }

      
      angular.element($element).on('click',function(event){
        updateButton();
        updatePosition();
        nlFormService.setActive($element);
      });

      function updateButton() {
        if($scope.selected !== undefined && $scope.selected.text !== '' && $scope.selected.text !== undefined) {
            buttonElement.removeClass('active');
        }
        else {
            buttonElement.addClass('active'); 
        }
      }

      function updatePosition() {
        //Don't show if parent can't be seen
        if(!isRendered($element[0])) {
          return;
        }

        var formPosition = getPosition(formElement);
        var elementPosition = getPosition($element);
        var triggerPosition = getPosition(buttonElement);
        var listPosition = getPosition(listElement);
        var pointerElement = angular.element(listElement[0].children[0]);

        var position = {
          top: 0,
          left: 0
        }

        position.top = (elementPosition.top - formPosition.top) + elementPosition.height + OFFSET;
        position.left = formPosition.left;

        //listElement.css({top: position.top + 'px', left: position.left + 'px', width: formPosition.width + 'px'});
        var l = elementPosition.left + (elementPosition.width / 2) - (listPosition.width /2);
        l = l < 0 ? 0 : l;
        listElement.css({left: l + 'px'});
        //pointerElement.css({left: triggerPosition.left - formPosition.left + (triggerPosition.width / 3 ) + 'px'});
        pointerElement.css({left: elementPosition.width / 2 + 'px'});
      }

      function getPosition(el) {
          el = el[0] || el;
          var r = el.getBoundingClientRect();
          //Account for scroll
          var scrollTop = $window.pageYOffset;
          var scrollLeft = $window.pageXOffset;
          return { left: r.left + scrollLeft,
                   top: r.top + scrollTop, 
                   right: r.right - scrollLeft,
                   bottom: r.bottom - scrollTop,
                   height: r.height, 
                   width: r.width};
      }

      function isRendered(el) {
        /**
         * Author: http://www.useallfive.com/thoughts/javascript-tool-detect-if-a-dom-element-is-truly-visible/
         * Checks if a DOM element is visible. Takes into
         * consideration its parents and overflow.
         *
         * @param (el)      the DOM element to check if is visible
         *
         * These params are optional that are sent in recursively,
         * you typically won't use these:
         *
         * @param (t)       Top corner position number
         * @param (r)       Right corner position number
         * @param (b)       Bottom corner position number
         * @param (l)       Left corner position number
         * @param (w)       Element width number
         * @param (h)       Element height number
         */
        function _isVisible(el, t, r, b, l, w, h) {
            var p = el.parentNode,
                    VISIBLE_PADDING = 2;

            if ( !_elementInDocument(el) ) {
                return false;
            }

            //-- Return true for document node
            if ( 9 === p.nodeType ) {
                return true;
            }

            //-- Return false if our element is invisible
            if (
                 '0' === _getStyle(el, 'opacity') ||
                 'none' === _getStyle(el, 'display') ||
                 'hidden' === _getStyle(el, 'visibility')
            ) {
                return false;
            }

            if (
                'undefined' === typeof(t) ||
                'undefined' === typeof(r) ||
                'undefined' === typeof(b) ||
                'undefined' === typeof(l) ||
                'undefined' === typeof(w) ||
                'undefined' === typeof(h)
            ) {
                t = el.offsetTop;
                l = el.offsetLeft;
                b = t + el.offsetHeight;
                r = l + el.offsetWidth;
                w = el.offsetWidth;
                h = el.offsetHeight;
            }
            //-- If we have a parent, let's continue:
            if ( p ) {
                //-- Check if the parent can hide its children.
                if ( ('hidden' === _getStyle(p, 'overflow') || 'scroll' === _getStyle(p, 'overflow')) ) {
                    //-- Only check if the offset is different for the parent
                    if (
                        //-- If the target element is to the right of the parent elm
                        l + VISIBLE_PADDING > p.offsetWidth + p.scrollLeft ||
                        //-- If the target element is to the left of the parent elm
                        l + w - VISIBLE_PADDING < p.scrollLeft ||
                        //-- If the target element is under the parent elm
                        t + VISIBLE_PADDING > p.offsetHeight + p.scrollTop ||
                        //-- If the target element is above the parent elm
                        t + h - VISIBLE_PADDING < p.scrollTop
                    ) {
                        //-- Our target element is out of bounds:
                        return false;
                    }
                }
                //-- Add the offset parent's left/top coords to our element's offset:
                if ( el.offsetParent === p ) {
                    l += p.offsetLeft;
                    t += p.offsetTop;
                }
                //-- Let's recursively check upwards:
                return _isVisible(p, t, r, b, l, w, h);
            }
            return true;
        }

        //-- Cross browser method to get style properties:
        function _getStyle(el, property) {
            if ( window.getComputedStyle ) {
                return document.defaultView.getComputedStyle(el,null)[property];
            }
            if ( el.currentStyle ) {
                return el.currentStyle[property];
            }
        }

        function _elementInDocument(element) {
            while (element = element.parentNode) {
                if (element == document) {
                        return true;
                }
            }
            return false;
        }

        return _isVisible(el);
      }

    }
  }

  var selectTpl = '<span value="{{ selected.value }}">{{ selected.text }}</span> \
      <button aria-label="menu" class="nl-select-trigger"> \
        ? \
      </button> \
      <div class="nl-select-options"> \
        <span class="pointer">▲</span> \
        <ul ng-transclude> \
        </ul> \
      </div>';

  nlOption.$inject = ['nlFormService','$interpolate'];

  function nlOption(nlFormService, $interpolate) {
    return {
      restrict:'E',
      require: ['^^ngModel','^^nlSelect'],
      transclude: true,
      replace: true,
      template: optionTpl,
      link: nlOptionLink,
      scope: {
        value: '@?value',
      },
    }

    function nlOptionLink($scope, $element, $attr, $ctrls) {
        angular.element($element).on('click',function(event){
            event.stopPropagation();
            var val = {
              value : $scope.value || $element.text(),
              text : $element.text()
            }
            //Set ngModel
            $ctrls[0].$setViewValue(val);
            //Update parent
            $ctrls[1].optionClicked();
        });    
    }
  }

  var optionTpl = '<li flex ng-transclude></li>';
  
})();

