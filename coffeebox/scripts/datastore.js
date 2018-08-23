

(function(window){
    'use strict'

    console.log(">> datastore.js fired << ");

    //window will be injected as parameter
    var App = window.App || {}; // {} == new object
    var Promise = window.Promise;

    //Constructor
    function DataStore(){
        this.data = {}; //Property object
    }

    //Helper function - PromiseResolveWith()
    function promiseResolvedWith(value){
        var promise = new Promise(function(resolve, reject){
            resolve(value);
        });
        return promise;
    }

    //Add value to same key will overwrite the old value
    DataStore.prototype.add = function(key, value) {
        
        this.data[key] = value;

        console.log("LocalDataStore.add: ");

        //Return promise object (helper fnc)
        return promiseResolvedWith(null);


    };

    DataStore.prototype.update = function(key, value) {
        if (this.data[key]) {
            console.log("LocalDataStore.update: ");
            console.log("key: " + key + " found! Update to value: " + value)
            this.data[key] = value;
        }else{
            console.log("key: " + key + " not found")
        }
        //Return promise object (helper fnc)
        return promiseResolvedWith(null);
    };

    DataStore.prototype.remove = function(key) {
        delete this.data[key]; //delete removes a key/value pair of an object !!
        console.log("LocalDataStore.remove: ");
        //Return promise object (helper fnc)
        return promiseResolvedWith(null);
    };

    DataStore.prototype.get = function (key) {
        //Return promise object (helper fnc)
        console.log("LocalDataStore.get: ");
        return promiseResolvedWith(this.data[key]);
    };

    DataStore.prototype.getAll = function () {
        console.log("LocalDataStore.getAll: ");
        //Return promise object (helper fnc)
        return promiseResolvedWith(this.data);
    };


    App.DataStore = DataStore;
    window.App = App;
    
})(window)



/*
var promise = new Promise(function(resolve, reject){
//resolve function change promise obj to status: 'fullfilled'
//reject function change promise obj to status: 'rejected'

this.data[key] = value;

resolve(null); 
// 'null' because >> Adding a value to datastore does 
//not produce a value, so there is nothing to resolve 

}.bind(this));
return promise;
*/