(function () {

    var app = angular.module("customerApp");

    var ManageCustomerController = function ($scope, customerService) {

        var onload = function () {
            $scope.customers = customerService.getCustomers();
        };

        var editCustomer = function (customer) {
            customer.type = "Edit";
            customerService.loadCustomerModelForm(customer);
        };
        
        $scope.selectAllRows = function () {
            if ($scope.isAll === false) {
                angular.forEach($scope.customers, function (row, index) {
                    if ((index >= ($scope.pageSize * $scope.currentPage) && index < ($scope.currentPage * $scope.pageSize + $scope.pageSize))) {
                        row.selected = true;
                    }
                });
                $scope.isAll = true;
                $scope.showDeleteButton=true;
            } else {
                angular.forEach($scope.customers, function (row, index) {
                    row.selected = false;
                });
                $scope.isAll = false;
                $scope.showDeleteButton=false;
            }
        };

        $scope.removeSelectedRows = function () {
            for (var i = $scope.customers.length - 1; i >= 0; i--) {
                if ($scope.customers[i].selected) {
                    $scope.customers.splice(i, 1);
                    $scope.isAll = false;
                    $scope.showDeleteButton=false;
                }
            }
        };

        $scope.rowSelectedButtonToggle = function (value){
            $scope.showDeleteButton=value;
        }

        $scope.tableSelection = {};
        $scope.isAll = false;
        $scope.showDeleteButton=false;
        $scope.editCustomer = editCustomer;
        onload();
        $scope.customer = [];
        $scope.pageSize = 2;
        $scope.currentPage = 0;
        $scope.numberOfPages = function () {
            return Math.ceil($scope.customers.length / $scope.pageSize);
        };
    };

    app.filter('startFrom', function () {
        return function (input, start) {
            start = +start; //parse to int
            return input.slice(start);
        };
    });
    app.controller("ManageCustomerController", ManageCustomerController);

}());