(function(window){
    'use strict'

    //IIFE Code goes here ;)
    //window will be injected as parameter
    var App = window.App || {}; // {} == new object

    //Constructor
    function FormHandler(){
       
    }

    App.FormHandler = FormHandler;
    window.App = App;
    
})(window)