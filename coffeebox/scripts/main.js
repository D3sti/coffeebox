(function(window){

    'use strict';

    console.log(">> main.js fired << ");

    var FORM_SELECTOR='[data-coffee-order="form"]';
    var FORM_SELECTOR_SLIDER='#strenghtLevel';

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var truckId = "FTR-558"


    //Export truck object to global namespace ('window') as property
    var foodTruck = new Truck(truckId, new DataStore());
    window.foodTruck = foodTruck;

    //Create new formhandler
    var formHandler = new FormHandler(FORM_SELECTOR);
    var formHandlerSlider = new FormHandler(FORM_SELECTOR_SLIDER);

    // We bind the current foodtruck instance to the 'createOrder' function object, to be sure, 
    // that the data will be added to the correct datastore!
    // 
    //  CodeSnippet of truck.js:
    //  this.datastore.add(order.emailAddress, order);
    //
    var ftCreateOrderFnc = foodTruck.createOrder.bind(foodTruck);

    formHandlerSlider.updateCurrentSliderValue();
    
    //Add the ftCreateOrderFnc-function to the addSubmitHandler
    formHandler.addSubmitHandler(ftCreateOrderFnc);
    formHandlerSlider.addOnChangeListenerHandler()
    
    console.log(formHandler);
    console.log(formHandlerSlider);


})(window)