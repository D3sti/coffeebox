(function(window){

    'use strict'

    console.log(">> connectivity.js fired << ");

    //window will be injected as parameter
    var App = window.App || {}; // {} == new object
    //var Promise = window.Promise;

    //Constructor
    function Connectivity(localDataStore, remoteDataStore){
        this.isBrowserOnline = {}; //Property object
        this.remoteStore = remoteDataStore || {};
        this.localStore = localDataStore || {};
    }


    /*Helper function - PromiseResolveWith()
    function promiseResolvedWith(value){
        var promise = new Promise(function(resolve, reject){
            resolve(value);
        });
        return promise;
    }
    */
    
    Connectivity.prototype.setLocalDataStore = function (activeTruck, localDataStore){
        if(activeTruck && localDataStore){
            console.log("Server is offline - Set Foodtruck to localstore!");
            activeTruck.datastore = localDataStore
        }
    }

    Connectivity.prototype.setRemoteDataStore = function (activeTruck, remoteDataStore){
        if(activeTruck && remoteDataStore){
            console.log("Server is online - Set Foodtruck to remotestore!");
            activeTruck.datastore = remoteDataStore
        }
    }

    Connectivity.prototype.updateOnlineStatus = function() {
        console.log("#> Connectivity: Browser is connected");
        this.isBrowserOnline = true;

        this.setRemoteDataStore(window.foodTruck, this.remoteStore);
    }

    Connectivity.prototype.updateOfflineStatus = function(){

        console.log("#> Connectivity: Browser is disconnected");
        this.isBrowserOnline = false;

        this.setLocalDataStore(window.foodTruck, this.localStore);
    }

    Connectivity.prototype.addOnIsOnlineListenerHandler = function() {
    
        window.addEventListener('online',  this.updateOnlineStatus.bind(this));
        console.log(">> addOnIsOnlineListenerHandler: addEventListener to 'online' is set");
        
        window.addEventListener('offline',  this.updateOfflineStatus.bind(this));
        console.log(">> addOnIsOnlineListenerHandler: addEventListener to 'offline' is set");
        
        //Return promise object (helper fnc)
        //return promiseResolvedWith(null);

    };  

    App.Connectivity = Connectivity;
    window.App = App;

})(window)