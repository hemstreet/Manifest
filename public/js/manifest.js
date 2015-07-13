var _ = require('lodash');

(function($) {

    var obj = {
        $underlay : null,
        currentIndex: 0,
        slides: [],

        init: function(_config) {

            var json = require('../../config/config.json'),
                config = _.assign( json, _config),
                slides = json.slides;

            this.$underlay = $('<div>').addClass(json.underlayClass)[0];

            $('body').append(this.$underlay);


            _(slides).forEach(function(slide) {
                $(slide.selector).addClass('manifest-active');
                console.log($(slide.selector));
            }).value();

        },
        next: function() {

        },

        previous: function() {

        }
    };

    obj.init({
        "sdfdsf" : true
    });

})(jQuery);