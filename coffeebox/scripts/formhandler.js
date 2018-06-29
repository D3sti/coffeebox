
(function(window){
    'use strict'

    //IIFE Code goes here ;)
    //window will be injected as parameter
    var App = window.App || {}; // {} == new object

    // >> BestPractice: Explicit declare variable for using external code
    var $ = window.jQuery;
    var $formObject = {};
    
    //Constructor
    function FormHandler(cssSelector){
       if (!cssSelector) {
           throw new Error("No css selector provided - Expect a css-selector as ctor-parameter!");
       }

        // >> BestPractice: The $ sign of $formElement indicates, that refers to elements selected using jQuery
        $formObject = $(cssSelector); //returns a single JQuery-wrapped-collection object with all references of the selected DOM-elements.
        this.$formElement = $formObject

        //Validate selector search
        if (this.$formElement.length === 0) {
            //throw new Error("Could not find DOM-element with selector: " + cssSelector);
        }
    }


    //Function callback
    // >> extFunc(inputData) need a parameter to get the input data to the truck instance amd
    // can call the createOrder function
    FormHandler.prototype.addSubmitHandler = function(extFunc){
        console.log("Setting submit handler (callback) for the form");
        
        this.$formElement.on("submit", function (event){
            event.preventDefault(); //>> does not take the user away from the main page

            var inputData = {};
            $(this).serializeArray().forEach(item => {
                inputData[item.name] = item.value;
                console.log(item.name + " has the value: " + item.value);
            });
            console.log(inputData);

            if (extFunc) {
                console.log(">> addSubmitHandler: extFunc is provided and will be executed");
                extFunc(inputData);
            }

        })
    };

    App.FormHandler = FormHandler;
    window.App = App;
    
})(window)