
(function(window){
    'use strict'

    console.log(">> truck.js fired << ");

    /*IIFE Code goes here (IIFE -- Immediately-invoked Function Expression)
        
        A IIFE always creates a "Scope" and variables and functions are not visible from outside the scope
        Outcome --> like a private scope / encapsulation !! Best Practice !!

        // >> IMPORTANT >> 
        // an outside defined variable with the same name definition will be "overruled" by the IIFE internal variable, which has the same name !!

        (function () {
            //...
        })();

    */

    //window will be injected as parameter
    var App = window.App || {}; // {} == new object()

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
        console.log("Adding order " + order.coffee + " for " + order.emailAddress);

        //Add the coffee order to data store
        //Returns a Deferred object from the RemoteDataStore
        return this.datastore.add(order.emailAddress, order);
    };

    //Deliver order
    Truck.prototype.deliverOrder = function(customerId){
        console.log("Delivering order for " + customerId);

        //Remove the coffee order of the data store
        //Returns a Deferred object from the RemoteDataStore
        return this.datastore.remove(customerId);
    };

    //Print orders
    Truck.prototype.printOrders = function(printFnc){  //printFnc >> passed in all Data of current coffee orders

        // Returns a Deferred object
        return this.datastore.getAll()
        .then(function(orders){ // expected orders from deferred obj >> this.datastore.getAll()

            //Get only the keys of the object (customer ID´s)
            var customerIdArray = Object.keys(orders);

            //Print header + each pending customer order 
            console.log(" Truck #" + this.truckId + " has pending orders:");

            // ATTENTION - 'forEach' us a anoymous function !!!
            customerIdArray.forEach(function(id){
                if (printFnc) {
                    console.log(orders[id]); //allData[id]
                }
            }.bind(this)); 

        }.bind(this));


        /*
            Passing the current 'Truck' object (this) as the owner object callback-fnc of that anonymous function!!
            Otherwise the inner "anonymous" function has an undefined 'owner' object callback-fnc as default!! --> ERROR on bind() call
            The keyword 'bind' modifies the anonymous func and return it with the binded object 'this' as callback-fnc
            
            >> Foreach provide a second parameter also for the callback function! <<

                customerIdArray.forEach(function(id){
                    console.log(this.datastore.get(id)); 
                }, this); <<<---- foreach / second parameter for callback-fnc
        */
    };

    App.Truck = Truck;
    window.App = App;

})(window)