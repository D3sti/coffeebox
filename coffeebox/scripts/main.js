(function(window){

    'use strict';

    var FORM_SELECTOR='[data-coffee-order="form"]';//'#datacoffeeform'//'[data-coffee-order="form"]';

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

    formHandler.addSubmitHandler();
    console.log(formHandler);

})(window)