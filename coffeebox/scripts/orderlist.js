
(function(window){
    'use strict'

    console.log(">> orderlist.js fired << ");

    /*IIFE Code goes here (IIFE -- Immediately-invoked Function Expression)
        
        A IIFE always creates a "Scope" and variables and functions are not visible from outside the scope
        Outcome --> like a private scope / encapsulation !! Best Practice !!

        // >> IMPORTANT >> 
        // an outside defined variable with the same name definition will be "overruled" by the IIFE internal variable, which has the same name !!

        (function () {
            //...
        })();

    */

   
    const ORDERITEM_SELECTOR='[data-coffee-order="checkbox-item"]';

    //window will be injected as parameter
    var App = window.App || {}; // {} == new object

    // >> BestPractice: Explicit declare variable for using external code libaries like jQuery
    var $ = window.jQuery;
    

    //Constructor
    function OrderList(cssSelector){
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


    OrderList.prototype.addOrderItem = function (coffeeOrder){

        console.log(">> OrderList.prototype.addOrderItem - remove existing item: " + coffeeOrder.emailAddress);
        //Remove existing order item
        this.removeOrderItem(coffeeOrder.emailAddress)

        console.log(">> OrderList.prototype.addOrderItem - create new OrderItem(" + coffeeOrder.emailAddress + ")");
        //Create new instance of a order item
        var orderItem = new OrderItem(coffeeOrder);

        console.log(">> OrderList.prototype.addOrderItem - append new OrderItem. ");
        // Add the new item instance $element property to the checklist.
        this.$formElement.append(orderItem.$element);
    };



    OrderList.prototype.removeOrderItem = function (emailAddress){

        
        var result = this.$formElement
        .find('[value="' + emailAddress + '"]')
        .closest(ORDERITEM_SELECTOR)
        .remove();

        if (result) {
            console.log(">> OrderList.removeOrderItem(" + emailAddress + ") >> Orderlist item removed.");
            console.log(result);
        }else{
            console.log(">> OrderList.removeOrderItem(" + emailAddress + ") >> Orderlist item does not exist!");
        }
    };


    OrderList.prototype.addClickHandler = function(extFunc){
        
        //extFunc <== deliverOrder(customerID) from main.js

        //"input" is a secondary parameter to set a 'filtering selector'
        //jQuery ONLY runs the callback, if the click was on an <input> element
        // --> Called "event delegation" pattern
        this.$formElement.on("click","input", function (event){ 

            var emailAddress = event.target.value;
            
            if (extFunc) {
                console.log(">> OrderList.addClickHandler: extFunc is provided and will be executed (Data: " + emailAddress + ")" );
                extFunc(emailAddress) //returns a Deferred object / main.js >> orderList.addClickHandler(foodTruck.deliverOrder.bind(foodTruck));
                .then(function(){
                    this.removeOrderItem(emailAddress);
                }.bind(this));
                
            }else{
                console.log(">> OrderList.addClickHandler: extFunc is not provided - Submit callback is not available!");
            }
            
        }.bind(this)); //bind(this) --> refers to the instance of the OrderList!
    };

    function OrderItem(coffeeOrder){
        
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox-item',
            'class': 'checkbox'
        });

        var $label = $('<label></label>');

        var $checkbox = $('<input></input>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        })

        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }

        description += coffeeOrder.coffee + ' ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strenght + 'x]';

        //Append all variable fields together (inner - out)
        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    App.OrderList = OrderList;
    window.App = App;
    
})(window)