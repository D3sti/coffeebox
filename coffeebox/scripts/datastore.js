

(function(window){
    'use strict'

    console.log(">> datastore.js fired << ");

    //IIFE Code goes here ;)
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