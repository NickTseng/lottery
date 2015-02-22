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
    $scope.setGroup = [
        []
    ];
    // $scope.number = '';


    for (var i = 1; i <= 49; i++) {
        var obj = {
            key: i,
            count: 0
        };

        $scope.set.push(obj);
    };

    $scope.addToArray = function(value) {

        // debugger;
        $scope.setGroup[$scope.setGroup.length - 1].push(value);


        var exist = $filter('filter')($scope.set, {
            key: value
        });
        // debugger;


        exist[0].count += 1;

    };


    $scope.$watch("number", function(newValue, oldValue) {

        // debugger;
        var str = newValue.toString();

        if (newValue == 0 || newValue > 49) {

            return
        }

        if ((str.length == 2)) {

            $scope.addToArray(newValue);
            $scope.number = '';

        } else {

            $scope.number = newValue;
        }

    });



    $scope.clear = function() {

        $scope.set = [];
        $scope.setGroup = [
            []
        ];
    }


    $scope.next = function() {
        // $scope.addToArray('');
        $scope.setGroup[$scope.setGroup.length] = [];
    }




});
