app.controller('pkgCtrl', function($rootScope, $scope, $http) {
    $scope.offer1= true;
    $scope.explanation1= true;

////////////////////////////////////////////////// datepicker-popup-persian config /////////////////////////////////////////////////
    $scope.today = function () {

        $scope.date2 = new Date();

    };
    $scope.today();

    $scope.clear = function () {
        $scope.date2 = null;
    };

// Disable weekend selection $scope.disabled = function(date, mode) { return ( mode === 'day' &&date.getDay() === 5 ); };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.openPersian1 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.persianIsOpen1 = true;
    };

    $scope.dateOptions = {formatYear: 'yyyy', startingDay: 6};

    $scope.initDate = new Date('2016-12-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];


/////////////////////////////// send to reserv ////////////////////////////////
    $scope.save1 = function (num1, num2, num3) {

        var params1 = {
            typ1: num1,
            date1: num2,
            num1: num3
        };

        var config1 = {
            params: params1
        };
        $http.get('/home/pkg', config1);

    }



});