(function() {
    var module = angular.module("customerApp");

    var customers = [];

    var customerService = function($modal) {

        function readSavedData() {
            if (JSON.parse(localStorage.getItem("customerdata"))) {
                customers = JSON.parse(localStorage.getItem("customerdata"));
                console.log(customers);
            }
            //window.location.reload();
            //alert("New Customer Added");
        }

        function saveData(customers) {
            console.log(customers);
            localStorage.setItem('customerdata', JSON.stringify(customers));
        }

        var saveCustomer = function(customer) {
            var customerData = {
                id: customer.id,
                country: customer.country,
                mobileNumber: customer.mobileNumber,
                name: customer.name,
                alternatemobilenumber: customer.alternatemobilenumber,
                email: customer.email,
                pan: customer.pan,
                pincode: customer.pincode,
                address: customer.address,
                area: customer.area,
                landmark: customer.landmark,
                selected: customer.selected
            };

            if (customer.id == null || customer.id == angular.undefined) {
                customerData.id = customers.length == 0 ? 0 : customers.length + 1;
                customers.push(customerData);
            } else {
                for (var i in customers) {
                    if (customers[i].id == customer.id) {
                        customers[i] = customerData;
                        break;
                    }
                }
            }
            saveData(customers);
        };

        var deleteCustomer = function(id) {
            for (var i in customers) {
                if (customers[i].id == id) {
                    customers.splice(i, 1);
                }
            }
            saveData(customers);
        };

        //Not needed
        var getCustomerById = function(id) {
            for (var i in customers) {
                if (customers[i].id == id) {
                    return customers[i];
                }
            }
        };

        var getCustomers = function() {
            return customers;
        };

        var loadCustomerModelForm = function(customer) {
            var options = {
                templateUrl: 'CustomerForm.html',
                controller: function() {
                    this.customer = customer;
                },
                controllerAs: "model"
            };
            //return $modal.open(options).result;
            return $modal.open(options);
        };

        var openNewCustomerModelForm = function() {
            var options = {
                templateUrl: 'CustomerForm.html'
            };
            return $modal.open(options);
        };

        readSavedData();
        // var buttonValue;

        return {
            saveCustomer: saveCustomer,
            deleteCustomer: deleteCustomer,
            getCustomers: getCustomers,
            getCustomerById: getCustomerById,
            loadCustomerModelForm: loadCustomerModelForm,
            openNewCustomerModelForm: openNewCustomerModelForm

            // getData: function() {
            //     return buttonValue;
            // },
            // setData: function(value) {
            //     buttonValue = value;
            // }
        };
    };

    module.factory("customerService", customerService);
    //module.service("customerService", customerService);
}());