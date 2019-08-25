(function() {

    var app = angular.module("customerApp", ["ui.router", 'ui.bootstrap']);
    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/home");
        var states = [{
                name: 'home',
                url: '/home',
                templateUrl: 'home.html',
                controller: "homeController"
            },
            {
                name: 'manageCustomer',
                url: '/manageCustomer',
                templateUrl: 'ManageCustomer.html',
                controller: "ManageCustomerController"
            },
            // {
            //     name: 'modal',
            //     url: '/modal',
            //     parent: 'home',
            //     onEnter: ['$stateParams', '$state', '$modal',
            //         function($stateParams, $state, $modal) {
            //             $modal.open({
            //                 templateUrl: 'CustomerForm.html',
            //                 controller: "CustomerFormController"
            //             })

            //             // change route after modal result
            //             .result.then(function() {
            //                 // change route after clicking OK button
            //                 $state.transitionTo('main');
            //             }, function() {
            //                 // change route after clicking Cancel button or clicking background
            //                 $state.transitionTo('main');
            //             });
            //         }
            //     ]

            // }
        ];

        // Loop over the state definitions and register them
        states.forEach(function(state) {
            $stateProvider.state(state);
        });
    });
}());