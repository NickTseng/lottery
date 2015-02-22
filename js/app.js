var app = angular.module('app', ['ngAnimate']);


app.controller('ctl', function($scope, $filter, $document) {
    $scope.number = '';
    $scope.pad = function(str, max) {
        // debugger;
        str = str.toString();
        return str.length < max ? $scope.pad("0" + str, max) : str;
    }


    $scope.numberArray = [];
    $scope.set = [];
    $scope.setGroup = [];
    // $scope.number = '';


    for (var i = 1; i <= 49; i++) {
        var obj = {
            key: i,
            count: 0
        };

        $scope.set.push(obj);
    };

    $scope.addToArray = function(value) {

        if ($scope.setGroup.length == 0) {
            $scope.setGroup.push([]);
        }
        $scope.setGroup[$scope.setGroup.length - 1].push(value);


        var exist = $filter('filter')($scope.set, {
            key: value
        });


        exist[0].count += 1;
    };


    $scope.deleteSet = function(index) {
        var set = $scope.setGroup[index];

        // remove
        $scope.setGroup.splice(index, 1);

        angular.forEach(set, function(value, key) {
            // this.push(key + ': ' + value);

            var exist = $filter('filter')($scope.set, {
                key: value
            });
            exist[0].count -= 1;

        });
    }

    // $scope.minusToArray = function(value) {


    // }


    $scope.$watch("number", function(newValue, oldValue) {

        // debugger;
        var str = newValue.toString();
        // debugger;
        if ((str.length > 2) || (isNaN(newValue) || !angular.isNumber(+newValue))) {

            $scope.number = oldValue;
            return;
        }

        if (newValue == 0 || newValue > 49) {
            $scope.number = '';
            return
        }

        if (str.length == 2) {

            $scope.addToArray(newValue);
            $scope.number = '';
            return;
        }


        $scope.number = newValue;


    });



    $scope.clear = function() {

        $scope.set = [];
        $scope.setGroup = [

        ];
    }


    $scope.next = function() {
        // $scope.addToArray('');
        $scope.setGroup[$scope.setGroup.length] = [];
    }


    $scope.isTop = function(value) {
        var top = $filter('orderBy')($scope.set, 'count', true);
        // debugger;

        for (var i = 0; i < 5; i++) {
            if (top[i].key == value) {
                return true;
            }
        };

        return false;
    }
});
