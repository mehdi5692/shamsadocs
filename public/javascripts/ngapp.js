var app = angular.module('docsApp', ['ui.router', 'ngTable', 'ngCookies', 'ui.bootstrap.persian.datepicker']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");
    $stateProvider
        .state('index', {
            url: "/index",
            templateUrl: 'users/page1',
            /* controller: mainCtrl*/
        })
        .state('docs', {
            url: "/docs",
            templateUrl: 'users/page2',
            /*controller: commCtrl*/
        })
        .state('person', {
            url: "/person",
            templateUrl: 'users/page3',
            /*controller: commCtrl*/
        })
        .state('addsend', {
            url: "/addsend",
            templateUrl: 'users/page7',
            /*controller: commCtrl*/
        })
        .state('send', {
            url: "/send",
            templateUrl: 'users/page4',
            /*controller: commCtrl*/
        })
        .state('addrecive', {
            url: "/addrecive",
            templateUrl: 'users/page8',
            /*controller: commCtrl*/
        })
    ;

}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});
