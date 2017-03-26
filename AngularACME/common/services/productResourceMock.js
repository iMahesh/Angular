(function () {
    "use strict";

    var app = angular
        .module("productResourceMock",
        ["ngMockE2E"]);

    app.run(function ($httpBackend) {
        var products = [
            {
            "productId": 1,
            "productName": "Leaf Rake",
            "productCode": "GDN-0011",
            "releaseDate": "March 19, 2009",
            "description": "Leaf rake with 48-inch wooden handle.",
            "cost": 9.00,
            "price": 19.95,
            "category": "garden",
            "tags": ["leaf", "tool"],
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
        },
        {
            "productId": 2,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate": "March 18, 2010",
            "description": "15 gallon capacity rolling garden cart",
            "cost": 20.00,
            "price": 32.99,
            "category": "garden",
            "tags": ["barrow", "cart", "wheelbarrow"],
            "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
        },
         {
             "productId": 5,
             "productName": "Hammer",
             "productCode": "TBX-0048",
             "releaseDate": "May 21, 2013",
             "description": "Curved claw steel hammer",
             "cost": 1.00,
             "price": 8.99,
             "category": "toolbox",
             "tags": ["tool"],
             "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"
         },
         {
             "productId": 8,
             "productName": "Saw",
             "productCode": "TBX-0022",
             "releaseDate": "May 15, 2009",
             "description": "15-inch steel blade hand saw",
             "cost": 6.95,
             "price": 11.55,
             "category": "garden",
             "tags": ["garden", "mower"],
             "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
         },
         {
             "productId": 10,
             "productName": "Video Game Controller",
             "productCode": "GMG-0042",
             "releaseDate": "October 15, 2002",
             "description": "Standard two-button video game controller",
             "cost": 2.22,
             "price": 35.95,
             "category": "gaming",
             "tags": ["gaming", "controller", "video game"],
             "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
         }];

        //adding the fake responces
        var productUrl = "/api/products"
        //what must happen when request is made
        //respond with entire array of products defined
        $httpBackend.whenGET(productUrl).respond(products);
        
        //setting up a GET method for returning a single product
        //using a regular expression RegExp
        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*", ''); //takes array of any numbers
        $httpBackend.whenGET(editingRegex).respond(function (method, url, data) {
            var pruduct = { "productId": 0 };
            var parameters = url.split('/');        //splits the url- puts each part of url in an array
            var length = parameters.length;         //
            var id = parameters[length - 1];        //the id will e in the last array ellement

            if (id > 0) {
                for (var i = 0; i < products.length; i++) { //loops through product looking for matching id
                    if (products[i].productId == id) {
                        product = products[i];
                        break;
                    }
                };
            }
            return [200, product, {}];     //200 = success value
        });
        //faking a POST
        $httpBackend.whenPOST(productUrl).respond(function (method, url, data) {
            var pruduct = angular.fromJson(data);   //de-serialise the data to access the field in JSON

            if (!product.productId) {    //check if it is a new product

                //new product Id
                product.productId = products[products.length - 1].productId + 1;
                products.push(products);

            }
            else {
                //Updated product
                for (var i = 0; i < products.length; i++) { //loops through product looking for matching id
                    if (products[i].productId == product.productId) {
                        products[i] = product;
                        break;
                    }
                };
            }
            return [200, product, {}];     //200 = success value
        });

        //$httpBackend block all url requests
        //Pass through any requests for application files
        $httpBackend.whenGET(/app/).passThrough();
    })

}());
