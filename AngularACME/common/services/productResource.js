(function(){
    "use strict";

    angular
        .module("common.services") //hook up the module
        .factory("productResource",
                ["$resource",
                productResource]); //ref factory service function

    function productResource($resource) { //the function
        return $resource("/api/products/:productId") //5 methods: Get; Query (also GET (array)); Save; Delete; Remove
    }


}());
