var _ = require('lodash');

(function($) {

    var obj = {
        $underlay : null,
        currentIndex: 0,
        slides: [],
        $slideContentContainer: null,

        init: function(_config) {

            var json = require('../../config/config.json'),
                config = _.assign( json, _config),
                $body = $('body');

            this.slides = json.slides;

            this.$underlay = $('<div>').addClass(json.underlayClass)[0];
            $body.append(this.$underlay);

            this.$slideContentContainer = $('<div class="manifest-container"><h3></h3><p></p><a href="#" data-manifest="previous">Previous</a><a href="#" data-manifest="next">Next</a></a></div>').addClass('manifest-container');
            $body.append(this.$slideContentContainer);

            if(json.startup === true) {
                $body.addClass('manifest-tutorial');
            }

            var $firstSlide = $(this.slides[0].selector);
            $firstSlide.addClass('manifest-active');
            this.currentIndex++;

            this.scrollTo($firstSlide);

            $('[data-manifest="next"]').on('click', this.next.bind(this));
            $('[data-manifest="previous"]').on('click', this.previous.bind(this));

        },
        next: function() {

            console.log('clicked next', this.slides.length, this.currentIndex);
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

        },
        previous: function() {

            console.log('clicked previous', this.currentIndex);
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

            var screenHeight = screen.height;
            $('html, body').animate({
                scrollTop: $el.offset().top - (screenHeight / 2)
            }, 1000);

            this.updateSlideContent();

        },
        updateSlideContent: function() {

            var index = this.currentIndex - 1,
                data = this.slides[index],
                $slide = $($(data.selector)[0]);

            $('h3', this.$slideContentContainer[0]).html(data.title);
            $('p', this.$slideContentContainer[0]).html(data.content);

            var css = {
                top: $slide.position().top - this.$slideContentContainer.outerHeight(),
                left: $slide.position().left
            };

            this.$slideContentContainer.css(css);

        },
        endOfSlides: function() {
            console.log('hit end of slides');
        },
        beginningOfSlides: function() {
            console.log('beginning of slides');
        }
    };

    obj.init({});


})(jQuery);