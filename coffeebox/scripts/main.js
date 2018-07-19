(function(window){

    'use strict';

    console.log(">> main.js fired << ");

    var FORM_SELECTOR='[data-coffee-order="form"]';
    var ORDERLIST_SELECTOR='[data-coffee-order="checklist"]';
    var FORM_SELECTOR_SLIDER='#strenghtLevel';

    //Get the current App-instance of the global variable stack
    var App = window.App;
    
    var Truck = App.Truck; // kickon Truck constructor 
    var DataStore = App.DataStore; // kickon DataStore constructor 
    var FormHandler = App.FormHandler; // kickon FormHandler constructor 
    var OrderList = App.OrderList; // kickon Orderlist constructor 

    var truckId = "Superfood-402"


    //Export truck object to global namespace ('window') as property
    var foodTruck = new Truck(truckId, new DataStore());
    window.foodTruck = foodTruck;

    //Create new Orderlist 
    var orderList = new OrderList(ORDERLIST_SELECTOR);

    //Create new formhandler
    var formHandler = new FormHandler(FORM_SELECTOR);
    var formHandlerSlider = new FormHandler(FORM_SELECTOR_SLIDER);

    // We bind the current foodtruck instance to the 'createOrder' function object, to be sure, 
    // that the data will be added to the correct datastore!
    // 
    //  CodeSnippet of truck.js:
    //  this.datastore.add(order.emailAddress, order);
    //
    //var ftCreateOrderFnc = foodTruck.createOrder.bind(foodTruck);

    formHandlerSlider.updateCurrentSliderValue();
    
    
    //Execute onClickHandler for the orderlist to remove a pending order item
    orderList.addClickHandler(foodTruck.deliverOrder.bind(foodTruck));// --> deliverOrder(customerID)

    //Execute functions on the addSubmitHandler
    formHandler.addSubmitHandler(function(data){
        foodTruck.createOrder(data);
        orderList.addOrderItem(data);
    });

    //listen to the slider events "change" and "input" 
    //NOTE: Could be refactored >> pass a control-ID and event-type as parameter arguments for multiple usage (like an utility-modul ?!)
    formHandlerSlider.addOnChangeListenerHandler() 
    
    console.log(formHandler);
    console.log(formHandlerSlider);


})(window)