var _ = require('lodash');

(function($) {

    var obj = {
        $underlay : null,
        currentIndex: 0,
        slides: [],

        init: function(_config) {

            var json = require('../../config/config.json'),
                config = _.assign( json, _config),
                $body = $('body');

            this.slides = json.slides;

            this.$underlay = $('<div>').addClass(json.underlayClass)[0];
            $body.append(this.$underlay);

            if(json.startup === true) {
                $body.addClass('manifest-tutorial');
            }

            $(this.slides[0].selector).addClass('manifest-active');
            this.currentIndex++;

        },
        next: function() {

            if(this.slides.length > this.currentIndex) {
                $(this.slides[this.currentIndex].selector).removeClass('manifest-active');

                var $slide = $(this.slides[this.currentIndex++].selector);
                $slide.addClass('manifest-active');

                this.scrollTo($slide);

            }
            else
            {
                this.endOfSlides();
            }

            this.scrollTo()

        },
        previous: function() {
            if(this.currentIndex > 0) {
                $(this.slides[this.currentIndex].selector).removeClass('manifest-active');

                var $slide = $(this.slides[this.currentIndex--].selector);
                $slide.addClass('manifest-active');

                this.scrollTo($slide);
            }
            else
            {
                this.endOfSlides();
            }

        },
        scrollTo : function($el) {

            $('html, body').animate({
                scrollTop: $el.offset().top
            }, 1000);

        },
        endOfSlides: function() {
            console.log('hit end of slides');
        },
        beginningOfSlides: function() {
            console.log('beginning of slides');
        }
    };

    obj.init({
        "sdfdsf" : true
    });

})(jQuery);