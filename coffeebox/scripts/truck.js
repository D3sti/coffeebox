
(function(window){
    'use strict'

    console.log(">> truck.js fired << ");

    //IIFE Code goes here ;)
    //window will be injected as parameter
    var App = window.App || {}; // {} == new object

    function Truck(truckId, datastore){

        this.truckId = truckId;
        this.datastore = datastore;

    }

    /* order Properties
    
        -email [string]
        -coffee [string]

    */

    //Create order
    Truck.prototype.createOrder = function(order){
        console.log("Adding order " + order.coffee + " for " + order.email);

        //Add drink to datastore object
        this.datastore.add(order.email, order);
    };


    
    //Deliver order
    Truck.prototype.deliverOrder = function(customerId){
        console.log("Delivering order for " + customerId);

        //Add drink to datastore object
        this.datastore.remove(customerId);
    };


    //Print orders
    Truck.prototype.printOrders = function(){

        //Get all customers (orders) listed in datastore
        var customerIdObjects = this.datastore.getAll();

        //Get only the keys of the object (customer ID´s)
        var customerIdArray = Object.keys(customerIdObjects);

        //Print header + each pending customer order 
        console.log(" Truck #" + this.truckId + " has pending orders:");

        // ATTENTION - 'forEach' us a anoymous function !!!
        customerIdArray.forEach(function(id){
            console.log(this.datastore.get(id));
        }.bind(this)); 
        
        /*
        //Passing the current 'Truck' object (this) as the owner object callback-fnc of that anonymous function!!
        // Otherwise the inner "anonymous" function has an undefined 'owner' object callback-fnc as default!!
        //The keyword 'bind' modifies the anonymous func and return it with the binded object 'this' as callback-fnc
        
        //Foreach provide a second parameter also for the callback function:

        customerIdArray.forEach(function(id){
            console.log(this.datastore.get(id)); 
        }, this); <<<---- foreach / second parameter for callback-fnc
        */
    };


    //Set Truck object
    App.Truck = Truck;
    window.App = App;

})(window)