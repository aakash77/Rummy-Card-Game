'use strict';
var rummy = angular.module("Rummy", [ 'ui.bootstrap' ]);

rummy.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

//Directive for selecting text in text box on click
rummy.directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    /*this.setSelectionRange(0, this.value.length)*/
                    this.select();
                }
            });
        }
    };
}]);
