

(function(window){
    'use strict'

    console.log(">> datastore.js fired << ");

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
    var App = window.App || {}; // {} == new object

    

    //Constructor
    function DataStore(){
        this.data = {}; //Property object
    }

    //
    // ## Modification functions ## 
    //

    //Add value to same key will overwrite the old value
    DataStore.prototype.add = function(key, value) {
        this.data[key] = value;
    };

    DataStore.prototype.update = function(key, value) {
        if (this.data[key]) {
            console.log("key: " + key + " found! Update to value: " + value)
            this.data[key] = value;
        }else{
            console.log("key: " + key + " not found")
        }
        
    };

    DataStore.prototype.remove = function(key) {
        delete this.data[key]; //delete removes a key/value pair of an object !!
    };

    //
    // ## Return functions ## 
    //
    DataStore.prototype.get = function (key) {
        return this.data[key];
    };

    DataStore.prototype.getAll = function () {
        return this.data;
    };


    App.DataStore = DataStore;
    window.App = App;
    
})(window)