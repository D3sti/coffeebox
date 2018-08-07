(function(window){

    'use strict';

    var App = window.App || {}

    var Validation = {

        //RegEx for email validation
        //The regex obj has a test method (test(email))
        isCompanyEmail: function(email){
            return /.+@coffeetruck\.com$/.test(email);
        }

    };


    App.Validation = Validation;
    window.App = App;


})(window)