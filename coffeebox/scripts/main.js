(function(window){

    'use strict';

    console.log(">> main.js fired << ");

    const FORM_SELECTOR='[data-coffee-order="form"]';
    const ORDERLIST_SELECTOR='[data-coffee-order="checkbox-list"]';
    const FORM_SELECTOR_SLIDER='#strenghtLevel';
    const SERVER_URL='http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    //var SERVER_URL='http://coffeerun-api.herokuapp.com/api/coffeeorders'; //Error URL


    //Get the current App-instance of the global variable stack
    var App = window.App;
    
    var Truck = App.Truck; // kickon Truck constructor 
    var DataStore = App.DataStore; // kickon DataStore constructor 
    var RemoteDataStore = App.RemoteDataStore; // kickon RemoteDataStore constructor
    var FormHandler = App.FormHandler; // kickon FormHandler constructor 
    var OrderList = App.OrderList; // kickon Orderlist constructor 
    var Validation = App.Validation; // kickon Validation constructor
    var Connectivity = App.Connectivity; // kickon Validation constructor
   
    
    var truckId = "Superfood-402"

    //Create new instance of Remote DataStore
    var remoteDataStore = new RemoteDataStore(SERVER_URL);
    var localDataStore = new DataStore();
    var browserConnectivity = new Connectivity(localDataStore, remoteDataStore);

    //Export truck object to global namespace ('window') as property
    //Set foodtruck to local datastore as default
    var foodTruck = new Truck(truckId, localDataStore);
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

    //Check connectivity
    browserConnectivity.addOnIsOnlineListenerHandler();

    //Execute onClickHandler for the orderlist to remove a pending order item
    orderList.addClickHandler(foodTruck.deliverOrder.bind(foodTruck));// --> deliverOrder(customerID)

    //Execute functions on the addSubmitHandler
    formHandler.addSubmitHandler(function(data){

        //Use Deferred object function '.then' for chaining callbacks ($ajax requests)
        return foodTruck.createOrder(data).then(function() {
            orderList.addOrderItem(data);
        }).catch((err) => {
            //alert('Server is unreachable - Please try again later.')
            browserConnectivity.updateOfflineStatus();
        });
    });

    //listen to the slider events "change" and "input" 
    //NOTE: Could be refactored >> pass a control-ID and event-type as parameter arguments for multiple usage (like an utility-modul ?!)
    formHandlerSlider.addOnChangeListenerHandler() 
    
    // Adds the Constrain Validation API module to the formhandler 
    // (Safari Browser does not support it !! --> Use help libary Webshim instead) 
    formHandler.addInputHandler(Validation.isCompanyEmail);

    foodTruck.printOrders(orderList.addOrderItem.bind(orderList));
    /* 
    >> orderList.addOrderItem(coffeeOrder)
    Remove existing order item
    this.removeOrderItem(coffeeOrder.emailAddress)
    //Create new instance of a order item
    var orderItem = new OrderItem(coffeeOrder);
    // Add the new item instance $element property to the checklist.
    this.$formElement.append(orderItem.$element);
    */

    // console.log(formHandler);
    // console.log(formHandlerSlider);


})(window)