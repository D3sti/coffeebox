(function(window){

    'use strict'

    var App = window.App || {};
    var $ = window.jQuery;



    function RemoteDataStore(url){

        if (!url) {
            throw new Error("No remote URL supplied!");
        }

        this.serverUrl = url;
    }
    
    

    RemoteDataStore.prototype.add = function(key, val){
        
        // The coffee order has to be on second part of the argument (like Datastore)
        return $.post(this.serverUrl, val, function(serverResponse){
            console.log("RemoteDataStore.add: ");
            console.log(serverResponse);
        });
    }

    RemoteDataStore.prototype.remove = function(key){
        
        // The coffee order has to be on second part of the argument (like Datastore)
        // Create request url: http://.../api/coffeeorders/a@b.com
        return $.ajax(this.serverUrl + '/' + key, {
            type: 'DELETE',
            success: function(result) {
                if (result) {
                    console.log("RemoteDataStore.remove: " + key);
                    console.log(result);
                }
            }
    });


    RemoteDataStore.prototype.getAll = function(cb){
        
        // The coffee order has to be on second part of the argument (like Datastore)
        return $.get(this.serverUrl, function(serverResponse){
            console.log("RemoteDataStore.getAll: ");
            console.log(serverResponse);
            
            if (cb) {
                cb(serverResponse);
            }
            
        });
    }

    RemoteDataStore.prototype.get = function(key, cb){
        
        // The coffee order has to be on second part of the argument (like Datastore)
        // Create request url: http://.../api/coffeeorders/a@b.com
        return $.get(this.serverUrl + '/' + key, function(serverResponse){
            console.log("RemoteDataStore.get: ");
            console.log(serverResponse);
            
            if (cb) {
                cb(serverResponse);
            }
        });
    }


    

        
    }


    App.RemoteDataStore = RemoteDataStore;
    window.App = App;

})(window)