app.controller('homeCtrl', function($rootScope, $scope, $http) {
    $scope.s_signup= true;
    $scope.s_login= true;
    $scope.pkgshow = false;

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






app.controller('shamsaCtrl', function($rootScope, $scope, $http) {

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


});





app.controller('page1Ctrl', function($rootScope, $scope, $http) {

});


app.controller('page2Ctrl', function($rootScope, $scope, $http, $location) {
    $scope.ali = "dfkajfaj;fkjas;kdlj";
    $scope.back = function() {
        var f = document.getElementById('backform');
        f.data1.value = "my";
        f.submit();
        //$http.post('/home/pkg', {'mode1' : "my"});
        //$location.path('/home/pkg');
       //$scope.ali = "ali";
    }
});




app.controller('page3Ctrl', function($rootScope, $scope, $http) {

    $http.get('cty_list')
        .success(function (response) {
            $scope.cty_data = response;
        });


    $scope.ali = "dfkajfaj;fkjas;kdlj";
    $scope.back = function() {
        var f = document.getElementById('backform');
        f.data1.value = "my";
        f.submit();
        //$http.post('/home/pkg', {'mode1' : "my"});
        //$location.path('/home/pkg');
        //$scope.ali = "ali";
    };

////////////////////////////////////////////////// datepicker-popup-persian config /////////////////////////////////////////////////
    $scope.today = function () {

        $scope.datein = new Date();
        $scope.dateto = new Date();
        $scope.ans1 = new Date($scope.date2);

    };
    $scope.today();

    $scope.clear = function () {
        $scope.datein = null;
        $scope.dateto = null;
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
        $scope.persianIsOpen2 = false;
    };
    $scope.openPersian2 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.persianIsOpen2 = true;
        $scope.persianIsOpen1 = false;
    };

    $scope.dateOptions = {formatYear: 'yyyy', startingDay: 6};

    $scope.initDate = new Date('2016-12-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];


});

app.controller('cty_insCtrl', function($rootScope, $scope, $http) {

    $http.get('cty_list')
        .success(function (response) {
            $scope.data1 = response;
     });


});




app.filter('jalaliDate', function () {
    return function (inputDate, format) {
        var date = moment(inputDate);
        return date.fromNow() + " " + date.format(format);
    };
});

app.filter('jalaliDate2', function () {
    return function (inputDate, format) {
        var date = moment(inputDate);
        return date.format(format);
    };
});

app.filter('g_Date', function () {
    return function (item) {
        var teeext = item[1].toString() + "/" + item[2].toString() + "/" + item[0].toString();
        return teeext;
    };
});

app.filter('J_Date', function () {
    return function (item) {
        var value = JalaliDate.gregorianToJalali(item[0], item[1], item[2]);
        var jalali = value[0].toString() + "/" + value[1].toString() + "/" + value[2].toString();
        return jalali ;
    };
});