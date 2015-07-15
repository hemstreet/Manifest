var _ = require('lodash');

(function($) {

    var manifest = {
        $underlay : null,
        currentIndex: 0,
        slides: [],
        $slideContentContainer: null,
        $firstSlide: null,
        $lastSlide: null,
        $currentSlide: null,

        init: function(_config) {

            var json = require('../../config/config.json'),
                config = _.assign( json, _config),
                $body = $('body');

            if(json.startup === false) {
                return false;
            }

            this.slides = json.slides;

            this.$underlay = $('<div>').addClass(json.underlayClass)[0];
            $body.append(this.$underlay);

            this.$slideContentContainer = $('<div class="manifest-container"><h3></h3><p></p><a href="#" data-manifest="previous">Previous</a><a href="#" data-manifest="next">Next</a><a href="#" data-manifest="end">End</a></div>');
            $body.append(this.$slideContentContainer);

            $('[data-manifest]').on('click', function(e) {
                e.preventDefault();
            });

            $body.addClass('manifest-tutorial');

            this.$firstSlide = $(this.slides[0].selector);
            this.$firstSlide.addClass('manifest-active');

            this.$lastSlide = $(this.slides[this.slides.length - 1].selector);

            $body.addClass('manifest-first');

            this.scrollTo(this.$firstSlide);

            $('[data-manifest="next"]').on('click', this.next.bind(this));
            $('[data-manifest="previous"]').on('click', this.previous.bind(this));
            $('[data-manifest="end"]').on('click', this.endOfSlides.bind(this));

        },
        next: function() {

            if(this.currentIndex < (this.slides.length - 1)) {
                $(this.slides[this.currentIndex].selector).removeClass('manifest-active');

                if(this.currentIndex == 0) {
                    $('body').removeClass('manifest-first');
                }

                this.currentIndex++;

                var $slide = $(this.slides[this.currentIndex].selector);

                $slide.addClass('manifest-active');

                this.scrollTo($slide);

                if(this.currentIndex == (this.slides.length - 1)) {
                    $('body').addClass('manifest-last');
                }

            }
            else
            {
                this.endOfSlides();
            }

        },
        previous: function() {

            if(this.currentIndex > 0) {

                if(this.currentIndex == (this.slides.length - 1)) {
                    $('body').removeClass('manifest-last');
                }

                if(this.currentIndex -1 == 0) {
                    $('body').addClass('manifest-first');
                }

                $(this.slides[this.currentIndex].selector).removeClass('manifest-active');

                this.currentIndex--;

                var $slide = $(this.slides[this.currentIndex].selector);
                $slide.addClass('manifest-active');

                this.scrollTo($slide);
            }
            else
            {
                this.beginningOfSlides();
            }

        },
        scrollTo : function($el) {

            var screenHeight = screen.height;
            this.scrollToTopByAmount($el.offset().top - (screenHeight / 2));

            this.$currentSlide = $el;

            this.updateSlideContent();

        },
        scrollToTopByAmount: function(top) {
            $('html, body').animate({
                scrollTop: top
            }, 1000);
        },
        updateSlideContent: function() {

            var data = this.slides[this.currentIndex];

            $('h3', this.$slideContentContainer[0]).html(data.content);
            $('p', this.$slideContentContainer[0]).html(data.title);

            var css = {
                top: this.$currentSlide.position().top - this.$slideContentContainer.outerHeight(),
                left: this.$currentSlide.position().left
            };

            this.$slideContentContainer.css(css);

        },
        endOfSlides: function() {

            $('.manifest-active').removeClass('manifest-active');

            $('body').addClass('manifest-end');


            console.log(this);
            this.scrollToTopByAmount(0);

        },
        beginningOfSlides: function() {
            $('body').addClass('manifest-start');
        }
    };

    manifest.init({});

})(jQuery);