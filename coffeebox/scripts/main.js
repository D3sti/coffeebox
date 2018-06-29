(function(window){

    'use strict';

    var FORM_SELECTOR='[data-coffee-order="form"]';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var truckId = "FTR-558"

    //Dummy testdata
    var foodTruck = new Truck(truckId, new DataStore());
    
    //Export truck object to global namespace ('window') as property
    window.foodTruck = foodTruck;
    var formHandler = new FormHandler(FORM_SELECTOR);

    // We bind the current foodtruck instance to the 'createOrder' function object, to be sure, 
    // that the data will be added to the correct datastore!
    // 
    //  CodeSnippet of truck.js:
    //  this.datastore.add(order.emailAddress, order);
    //
    var ftCreateOrderFnc = foodTruck.createOrder.bind(foodTruck);

    //Add the ftCreateOrderFnc-function to the addSubmitHandler
    formHandler.addSubmitHandler(ftCreateOrderFnc);

    console.log(formHandler);


})(window)