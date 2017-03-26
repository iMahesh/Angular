//controller as syntax - don't need the $scope injected

(function () {
    "use strict";
    angular
        .module("productManagement") //reference to the module
        .controller("ProductListCtrl", //register the controller with the module
                    ["productResource",    //after creating the productResource, it has to be referenced
                        ProductListCtrl]);
    function ProductListCtrl(productResource) {

        var vm = this;

        productResource.query(function (data) {
            vm.products = data;  //assign the returned data to the model
        });


        //method to switch image display on and off
        //new variable
        vm.showImage = false;
        
        //define a function that toggles the variable
        vm.toggleImage = function () {
            vm.showImage = !vm.showImage; //inverse the boolean
        }
    }

}());
