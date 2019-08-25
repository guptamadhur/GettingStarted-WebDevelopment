(function() {
    var module = angular.module("customerApp");

    var CustomerFormController = function($scope, $window, customerService) {

        var helpButton = function() {
            $window.open('https://www.google.com', '_blank');
        };

        $scope.helpButton = helpButton;

        $scope.cancel = function() {
            $scope.$dismiss();
        };
        // close modal after clicking OK button
        $scope.ok = function() {
            $scope.$close(true);
        };

        var addCustomer = function(customer) {
            if (customer == null || customer == angular.undefined)
                return;
            customerService.saveCustomer(customer);
            $scope.$close(true);
            console.log('form submitted: ', customer);
        };

        $scope.addCustomer = addCustomer;

        // $scope.$watch(function() { return customerService.getData(); }, function(newValue, oldValue) {
        //     if (newValue != null) {
        //         $scope.customer = newValue;
        //     }
        // }, true);

        // $scope.customer.country = "India";
        // $scope.customer.mobileNumber = "9807070555";
        // $scope.customer.name = "Hitesh";
        // $scope.customer.alternatemobilenumber = "9807070555";
        // $scope.customer.email = "dssadsa@gma.com";
        // // $scope.customer.pan;
        // $scope.customer.pincode = "5502422";
        // $scope.customer.address = "sdfsafasfAddress";
        // $scope.customer.area = "Area Address";
        // //$scope.customer.landmark;

    };

    module.controller("CustomerFormController", CustomerFormController);
}());