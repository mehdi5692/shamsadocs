app.controller('mainCtrl', function($scope) {
    $scope.s_signup= true;
    $scope.s_login= true;
    $scope.gtitle = false;
    $scope.doc_id = null;
    $scope.doc_num = "545785757";
});

app.controller('commCtrl', function($scope,$http,ngTableParams) {
    $scope.comment = 'لیست اسناد ثبت شده.';
    $scope.doc_id = null;
    $scope.doc_num = null;
    $scope.date2 = new Date();
    $scope.doc_num_chenge = function () {
        $scope.array = $scope.doc_id.split("-");
        $scope.doc_num = $scope.array[0];
    };

    con1();

    function con1 () {
        $http.get('users/docs')
            .success(function (response) {
                $scope.cty_data = response;
                var data = response;

                $scope.tableParams = new ngTableParams({
                    sorting: {'ID': 'acs'},
                    filter: {},
                    page: 1,
                    total: data.length,
                    count: 10
                }, {dataset: data});
                function getData($defer, params) {
                    var orderData = params.sorting ? $filter('orderBy')(data, params.orderBy()) : data;
                    $defer.resolve(orderData);
                };

            }).finally(function () {
            $scope.tableParams.reload();
        });
    };

    $scope.add_doc = function (num1, num2) {
        var docid = numreplace(num1);
        var docnum = numreplace(num2);
        $http.post('users/add_doc', {'id' : docid, 'doc_num' : docnum, 'doc_date' : $scope.date2 })
            .success(function (response) {
                //console.log(response);
               if (response.msg == 'duplicate') {
                   alert('سند تکراری .');
               } else if (response.msg == 'sucsses'){
                   alert('سند ثبت گردید .');
                   con1();
               } else {
                   alert('اشکال در سیستم .');
               }
            }).finally(function () {
                document.getElementById('doc_id1').value = '';
        });
    };
    function numreplace (num) {
        var data = num.replace(/۱/g, "1");
        var data = num.replace(/۲/g, "2");
        var data = num.replace(/۳/g, "3");
        var data = num.replace(/۴/g, "4");
        var data = num.replace(/۵/g, "5");
        var data = num.replace(/۶/g, "6");
        var data = num.replace(/۷/g, "7");
        var data = num.replace(/۸/g, "8");
        var data = num.replace(/۹/g, "9");
        var data = num.replace(/۰/g, "0");
        return data;
    };
    $scope.kala_load = function (num1) {
        /*
        $http.post('users/kala_detail', {'kid' : num1})
            .success(function (response) {
                $scope.cty_data = response;
                var data1 = response;

                $scope.tableParams1 = new ngTableParams({
                    sorting: {'ACU_Id': 'acs'},
                    filter: {},
                    page: 1,
                    total: data1.length,
                    count: 10
                }, {dataset: data1});
                function getData($defer, params) {
                    var orderData = params.sorting ? $filter('orderBy')(data1, params.orderBy()) : data1;
                    $defer.resolve(orderData);
                };

            }).finally(function () {
            $scope.tableParams1.reload();
        });

         */
    }
});

app.controller('personCtrl', function($scope,$http,ngTableParams) {
    $scope.comment = 'لیست افراد مرتبط';
    $scope.doc_id = null;
    $scope.doc_num = null;

    con1();

    function con1 () {
        $http.get('users/persons')
            .success(function (response) {
                $scope.cty_data = response;
                var data = response;

                $scope.tableParams = new ngTableParams({
                    sorting: {'ID': 'acs'},
                    filter: {},
                    page: 1,
                    total: data.length,
                    count: 10
                }, {dataset: data});
                function getData($defer, params) {
                    var orderData = params.sorting ? $filter('orderBy')(data, params.orderBy()) : data;
                    $defer.resolve(orderData);
                };

            }).finally(function () {
            $scope.tableParams.reload();
        });
    }



    $scope.add_person = function (num1, num2, num3) {
        $http.post('users/add_person', {'person_name': num1, 'person_famili': num2, 'person_comment': num3})
            .success(function (response) {
                //console.log(response);
                if (response.msg == 'sucsses') {
                    alert('سند ثبت گردید .');
                    con1();
                } else {
                    alert('اشکال در ثبت اطلاعات');
                }
            });
    };
});


app.controller('addsendCtrl', function($rootScope,$scope,$http,ngTableParams,$cookieStore,$state) {

    $scope.comment = 'ثبت فرد تحویل گیرنده';
    $scope.comment1 = 'اطلاعات فرد تحویل گیرنده ثبت گردید .';
    $scope.comment_style = 'panel-primary';
    $scope.comment2 = 'ثبت اسناد تحویل شده .';
    $scope.sh_panel = false;
    $scope.send_ID = null;
    $cookieStore.put('myFavorite', 'oatmeal');

    con1();

    function con1 () {
        $http.get('users/persons')
            .success(function (response) {
                $scope.person_data = response;
        });
    }




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


///////////////////////////////////////////////////////////end datepicker-popup-persian config ///////////////////////////////////////////////////////////////////////
    $scope.test = function () {
        alert("ksdfhsdf");
        $scope.doc_code = "kfsdjfklsdjflksdjflkjsdlkfjsdlkfjlsdkj";
        document.getElementById('doc_code').value = '' ;
    };

    $scope.add_send = function (num1, num2) {
        var date1 = (num2.getMonth()+1).toString() + "/" + num2.getDate().toString() + "/" + num2.getFullYear().toString();
        if (!num1){
            //alert('لطفا فرد تحویل گیرنده را انتخاب نمایید .');
            $scope.comment = "لطفا فرد تحویل گیرنده را انتخاب نمایید .";
            $scope.comment_style = 'panel-danger';
        } else {

            $http.post('users/add_send_person', {'person_id' : num1, 'send_date' : date1})
                .success(function (res) {
                    $scope.send_ID = res;
                    $scope.userid = res.USER_ID;
                    console.log($scope.send_ID);
                    console.log($scope.userid);
                    $cookieStore.put('send_ID', res );
                }).finally(function () {
                    $scope.comment = "ثبت فرد تحویل گیرنده";
                    $scope.sh_panel = true;
                    $scope.comment_style = 'panel-primary';
            });

        }
    };

    $scope.add_send_doc = function (num) {

        $http.post('users/add_send_doc', {'send_id' : num, 'doc_id' : document.getElementById('doc_code').value, 'user_id' : $scope.userid})
            .success(function (res) {
                $scope.send_doc = res;
                if (res.msg == 'no doc') {
                    alert("این سند در بایگانی ثبت نشده است .");
                } else if (res.msg == 'doc exit') {
                    alert('این سند در اختیار کاربر دیگری می باشد .');
                }
            }).finally(function () {
            col2(num);
            document.getElementById('doc_code').value = '' ;
        });
    };

    function col2 (num) {
        $http.post('users/send_doc_list', {'send_id' : num})
            .success(function (response) {
                $scope.send_list = response;
                var data2 = response;

                $scope.tableParams_send = new ngTableParams({
                    sorting: {'DOC_NUM': 'acs'},
                    filter: {},
                    page: 1,
                    total: data2.length,
                    count: 10
                }, {dataset: data2});
                function getData($defer, params) {
                    var orderData = params.sorting ? $filter('orderBy')(data2, params.orderBy()) : data2;
                    $defer.resolve(orderData);
                };

            }).finally(function () {
            $scope.tableParams_send.reload();
        });
    }

    /*
    $scope.cty_list = function (num1, num2) {
        var date1 = (num2.getMonth()+1).toString() + "/" + num2.getDate().toString() + "/" + num2.getFullYear().toString();
        $scope.datef = date1;
        $http.post('users/plane', {'cty' : num1, 'date1' : date1})
            .success(function (response) {
                $scope.cty_data = response;
                var data2 = response;

                $scope.tableParams3 = new ngTableParams({
                    sorting: {'ACU_Id': 'acs'},
                    filter: {},
                    page: 1,
                    total: data2.length,
                    count: 10
                }, {dataset: data2});
                function getData($defer, params) {
                    var orderData = params.sorting ? $filter('orderBy')(data2, params.orderBy()) : data2;
                    $defer.resolve(orderData);
                };

            }).finally(function () {
            $scope.tableParams3.reload();
            $scope.sh_panel = true;
        });
    }

     */

    $scope.good_plan = function (num1) {
        $cookieStore.put('datef1', $scope.datef);
        $cookieStore.put('hot_uid1', num1);
        $state.go("plane");
    }

});


app.controller('listCtrl', function($rootScope,$scope,$http,ngTableParams,$cookieStore,$state) {

    $scope.comment = 'لیست افراد';
    $scope.comment2 = 'اطلاعات هتل ها ';
    $scope.sh_panel = false;
    $cookieStore.put('myFavorite', 'oatmeal');

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


///////////////////////////////////////////////////////////end datepicker-popup-persian config ///////////////////////////////////////////////////////////////////////
    $scope.cty_list = function (num1, num2) {
        var date1 = (num2.getMonth()+1).toString() + "/" + num2.getDate().toString() + "/" + num2.getFullYear().toString();
        $scope.datef = date1;
        $http.post('users/plane', {'cty' : num1, 'date1' : date1})
            .success(function (response) {
                $scope.cty_data = response;
                var data2 = response;

                $scope.tableParams3 = new ngTableParams({
                    sorting: {'ACU_Id': 'acs'},
                    filter: {},
                    page: 1,
                    total: data2.length,
                    count: 10
                }, {dataset: data2});
                function getData($defer, params) {
                    var orderData = params.sorting ? $filter('orderBy')(data2, params.orderBy()) : data2;
                    $defer.resolve(orderData);
                };

            }).finally(function () {
            $scope.tableParams3.reload();
            $scope.sh_panel = true;
        });
    }

    $scope.good_plan = function (num1) {
        $cookieStore.put('datef1', $scope.datef);
        $cookieStore.put('hot_uid1', num1);
        $state.go("plane");
    }

});


app.controller('planCtrl', function($scope,$http,ngTableParams,$cookieStore) {
    $scope.comment = 'اطلاعات هتل';
    $scope.datef = $cookieStore.get('datef1');
    $scope.hot_uid = $cookieStore.get('hot_uid1');
    $http.post('users/hotel', {'hid' : $scope.hot_uid})
        .success(function (response) {
            $scope.hot_d = response;
        });
    $http.post('users/plane2', {'hid' : $scope.hot_uid, 'date1' : $scope.datef})
        .success(function (response) {
            $scope.hot_p = response;
            var data3 = response;

            $scope.tableParams4 = new ngTableParams({
                sorting: {'ACU_Id': 'acs'},
                filter: {},
                page: 1,
                total: data3.length,
                count: 10
            }, {dataset: data3});
            function getData($defer, params) {
                var orderData = params.sorting ? $filter('orderBy')(data3, params.orderBy()) : data3;
                $defer.resolve(orderData);
            };

        }).finally(function () {
        $scope.tableParams4.reload();
        $scope.sh_panel = true;
        });
});


app.filter('conv1', function () {
    return function (inputDate) {
       // var date = inputDate;
        //var act = iconv.decode(date, 'WINDOWS-1256');
        //var act = inputDate.toString('WINDOWS-1256');
        return String.fromCharCode.apply(null, new Uint8Array(inputDate));
    }
});

app.filter('act', function () {
    return function (inputDate) {
        var data1 = '';
        if (inputDate == '0') {
            data1 = 'داخل بایگانی'
        } else if (inputDate == '1') {
            data1 = 'تحویل کاربر';
        } else {
            data1 = 'نامشخص';
        }
        // var date = inputDate;
        //var act = iconv.decode(date, 'WINDOWS-1256');
        //var act = inputDate.toString('WINDOWS-1256');
        return data1;
    }
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
