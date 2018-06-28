(function(window){

    'use strict';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;

    var truckId = "FTR-558"

    //Dummy testdata
    var foodTruck = new Truck(truckId, new DataStore());
    foodTruck.createOrder({ emailAddress: "Sam", coffee: "Kaukau"});
    foodTruck.createOrder({ emailAddress: "Freddy", coffee: "Tee"});
    foodTruck.createOrder({ emailAddress: "Sepp", coffee: "Kaffee"});

    //Export truck object to global namespace ('window') as property
    window.foodTruck = foodTruck;

})(window)