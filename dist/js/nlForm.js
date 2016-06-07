!function(){"use strict";function e(){}angular.module("nlForm",[]),angular.module("nlForm").run(e),e.$inject=[]}(),function(){"use strict";function e(){}angular.module("nlForm").config(e).constant("CONFIG",{}),e.$inject=[]}(),function(){"use strict";function e(){function e(e){null!=i?(i.removeClass("active"),e!=i?(e.addClass("active"),i=e):i=null):(e.addClass("active"),i=e)}function t(){null!=i&&(i.removeClass("active"),i=null)}function n(){return i}function l(){i=null}var i=null;return{setActive:e,closeActive:t,getActive:n,clearActive:l}}angular.module("nlForm").factory("nlFormService",e),e.$inject=[]}(),function(){"use strict";function e(){return{restrict:"EA",controller:["$scope","$element","nlFormService",function(e,t,n){this.element=t,n.clearActive()}]}}angular.module("nlForm").directive("nlForm",e)}(),function(){"use strict";function e(){function e(e,t,n,l){function i(){var e=t.html();e=e.replace(/(&nbsp;)+$/g,""),e=String(e).replace(/<[^>]+>/gm,""),c.$setViewValue(e)}t.attr("contenteditable","true");var c=l[0];t.bind("click",function(){t[0]!=document.activeElement&&t[0].focus()}),t.bind("paste",function(e){e.preventDefault();var t=e.clipboardData.getData("text/plain");document.execCommand("insertHTML",!1,t)}),c.$render=function(){t.html(c.$viewValue||"")},t.bind("blur keyup change",function(){e.$apply(i)}),t.bind("keydown",function(e){13===e.keyCode&&e.preventDefault()}),e.getWidth=function(){return t[0].offsetWidth},e.$watch(e.getWidth,function(e){e>150?t.addClass("inline"):150>=e&&t.removeClass("inline")})}return{restrict:"EA",require:["ngModel"],link:e}}angular.module("nlForm").directive("nlText",e),e.$inject=[]}(),function(){"use strict";function e(e,t,l,i){function c(e,n){this.optionClicked=function(){var l=n.controller("ngModel");void 0!=l.$viewValue&&"object"==typeof l.$viewValue&&(e.selected=l.$viewValue,e.$apply()),t.setActive(n)}}function r(n,l,i,c){function r(e,t){for(e=e[0]||e,t=t[0]||t;(e=e.parentNode)&&e!==t;);return!!e}function o(){void 0!==n.selected&&""!==n.selected.text&&void 0!==n.selected.text?l.removeClass("active"):l.addClass("active")}c[1].element,angular.element(l.children()[1]);angular.element(e).on("click",function(e){var n=t.getActive();null!=n&&r(angular.element(e.target),n)===!1&&t.closeActive()}),angular.element(l).on("click",function(e){o(),t.setActive(l)})}return c.$inject=["$scope","$element"],{restrict:"E",require:["ngModel","^^nlForm"],transclude:!0,template:n,link:r,controller:c,scope:{selected:"=?",placeholder:"@"}}}function t(e,t){function n(e,t,n,l){angular.element(t).on("click",function(n){n.stopPropagation();var i={value:e.value||t.text(),text:t.text()};l[0].$setViewValue(i),l[1].optionClicked()})}return{restrict:"E",require:["^^ngModel","^^nlSelect"],transclude:!0,replace:!0,template:l,link:n,scope:{value:"@?value"}}}angular.module("nlForm").directive("nlSelect",e).directive("nlOption",t),e.$inject=["$window","nlFormService","$interpolate","$timeout"];var n='<button aria-label="menu" class="nl-select-trigger" value="{{ selected.value }}">{{ selected.text || placeholder }}</button>       <div class="nl-select-options">         <ul ng-transclude>         </ul>       </div>';t.$inject=["nlFormService","$interpolate"];var l="<li flex ng-transclude></li>"}();
//# sourceMappingURL=nlForm.js.map