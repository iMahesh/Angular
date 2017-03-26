
(function (){

    "use strict"; // puts the content of IIFE in strict mode, and catch common coding mistakes, like unassigned vars
    var app = angular.module("productManagement",
                            ["common.services",
                            "ui.router",
                            "productResourceMock"]);

    //setting up the Routing via ui.router
    app.config(["$stateProvider",     //the config method takes one param - the fuunction that defines the config code
                "$urlRouterProvider",  //this is used for setting up the otherwise functions
                    function ($stateProvider, $urlRouterProvider) {

                    $urlRouterProvider.otherwise("/products");

                    $stateProvider
                    //Products
                        .state("productList", {
                            url: "/products",
                            templateUrl: "app/products/productListView.html",
                            controller: "ProductListCtrl as vm"
                        })
                }]
        );
}());
