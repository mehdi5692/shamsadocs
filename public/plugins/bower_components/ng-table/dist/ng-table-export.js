/*! ngTableExport v0.1.0 by Vitalii Savchuk(esvit666@gmail.com) - https://github.com/esvit/ng-table-export - New BSD License */
angular.module("ngTableExport", []).config(["$compileProvider", function (a) {
    a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|data):/)
}]).directive("exportCsv", ["$parse", function (a) {
    return {
        restrict: "A", scope: !1, link: function (b, c, d) {
            var e = "", f = {
                stringify: function (a) {
                    return '"' + a.replace(/^\s\s*/, "").replace(/\s*\s$/, "").replace(/"/g, '""') + '"'
                }, generate: function () {
                    e = "";
                    var a = c.find("tr");
                    angular.forEach(a, function (a, b) {
                        var c = angular.element(a), d = c.find("th"), g = "";
                        c.hasClass("ng-table-filters") || (0 == d.length && (d = c.find("td")), 1 != b && (angular.forEach(d, function (a) {
                            g += f.stringify(angular.element(a).text()) + ";"
                        }), g = g.slice(0, g.length - 1)), e += g + "\n")
                    })
                }, link: function () {
                    return "data:text/csv;charset=UTF-8," + encodeURIComponent(e)
                }
            };
            a(d.exportCsv).assign(b.$parent, f)
        }
    }
}]);
//# sourceMappingURL=ng-table-export.map