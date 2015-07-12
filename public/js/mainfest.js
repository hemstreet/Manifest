var $ = require('jquery'),
    _ = require('lodash');

(function() {


    var $el = $('<div>Hello World!</div>');

    $('body').append($el);

    console.log('Hello World!');

    var obj = {

        hello: "World",

        init: function(_config) {

            var json = require('../../config/config.json'),
                config = _.assign( json, _config);

            console.log(config, this.hello);

        }
    };

    obj.init({
        "sdfdsf" : true
    });

})();