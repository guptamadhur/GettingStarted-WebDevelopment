(function() {

    var app = angular.module("customerApp");

    var homeController = function($scope, customerService) {

        $scope.newCustomer = function() {
            var customer = [];
            customer.type = "Add New";
            customerService.openNewCustomerModelForm();
            // .then(function() {
            //     if (customer == null || customer == angular.undefined)
            //         return;
            //     customerService.saveCustomer(customer);
            // });
        };
    };

    app.controller("homeController", homeController);

}());