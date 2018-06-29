
(function(window){
    'use strict'


    console.log(">> formhandler.js fired << ");

    //IIFE Code goes here ;)
    //window will be injected as parameter
    var App = window.App || {}; // {} == new object

    // >> BestPractice: Explicit declare variable for using external code libaries like jQuery
    var $ = window.jQuery;
    

    //Constructor
    function FormHandler(cssSelector){
       if (!cssSelector) {
           throw new Error("No css selector provided - Expect a css-selector as ctor-parameter!");
       }

        // >> BestPractice: The $ sign of $formElement indicates, that refers to elements selected using jQuery
        this.$formElement = $(cssSelector); //returns a single JQuery-wrapped-collection object with all references of the selected DOM-elements.
        
        //Validate selector search
        if (this.$formElement.length === 0) {
            throw new Error("Could not find DOM-element with selector: " + cssSelector);
        }

    }


    //Function callback
    // >> extFunc(inputData) need a parameter to get the input data to the truck instance amd
    // can call the createOrder function
    FormHandler.prototype.addSubmitHandler = function(extFunc){
        //console.log("Add submit handler (callback) for the form");
        
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
            }else{
                console.log(">> addSubmitHandler: extFunc is not provided - Submit callback is not available!");
            }
            
            //Reset the form elements
            this.reset();
            this.elements[0].focus();
        })
    };


    FormHandler.prototype.addOnChangeListenerHandler = function(extFunc){
        //console.log("Add submit handler (callback) for the form");
        
        this.$formElement.on("change input", function (event){
            event.preventDefault(); //>> does not take the user away from the main page

            var inputData = {};
            $(this).serializeArray().forEach(item => {
                inputData[item.name] = item.value;
                console.log(item.name + " has the value: " + item.value);
            });
            console.log(inputData);

            if (extFunc) {
                console.log(">> addOnChangeListenerHandler: extFunc is provided and will be executed");
                extFunc(inputData);
            }else{
                console.log(">> addOnChangeListenerHandler: extFunc is not provided - execute internal updateSliderValue() !");
                updateSliderValue(inputData);
            }
            
        })
    };

    //Update current Slider value
    FormHandler.prototype.updateCurrentSliderValue = function(){
        updateSliderValue();
    };

    //Update the current slider value
    var updateSliderValue = function (data){

        //if data does not exist, get current slider value
        if (!data) {
            data = {};
            console.log(">> updateSliderValue fired - data not provided, set current value of slider");
            var currValueArray = $("#strenghtLevel");
            if (currValueArray) {
                data.strenght = currValueArray[0].value 
            }
        }

        //Update value of DOM tag element
        console.log(">> updateSliderValue fired - data provided: " + data.strenght);
        var sliderValueElem = $("#strenghtValue");
        if (sliderValueElem) {
            sliderValueElem[0].value  = data.strenght;
        }
        
    }

    App.FormHandler = FormHandler;
    window.App = App;
    
})(window)