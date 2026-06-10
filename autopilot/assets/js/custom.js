/*--------------------- Copyright (c) 2026-----------------------
[Master Javascript]
Project:
-------------------------------------------------------------------*/
(function($) {
    "use strict";
    var ShowcaseAI = {
        initialised: false,
        version: 1.0,
        mobile: false,
        init: function() {
            if (!this.initialised) {
                this.initialised = true;
            } else {
                return;
            }
            /*---------------------- ShowcaseAI Functions Calling ----------------------*/
            this.FooterCopyright();
            this.FaqAccordion();
            this.StickyPromoBar();
            this.StickyHeader();

        },

        // Sticky Header - appears when scrolling down
        StickyHeader: function() {
            var $header = $('#fe_stickyHeader');
            if (!$header.length) {
                return;
            }
            var showAfter = 400; // px scrolled before header appears
            var toggle = function() {
                if ($(window).scrollTop() > showAfter) {
                    $header.addClass('is-visible');
                } else {
                    $header.removeClass('is-visible');
                }
            };
            toggle();
            $(window).on('scroll', toggle);
        },

        /*---------------------- ShowcaseAI Functions Calling ----------------------*/



        // Footer Copyright
        FooterCopyright: function() {
            var el = document.getElementById('currentYear');
            if (el) {
                el.textContent = new Date().getFullYear();
            }
        },

        // FAQ Accordion (Pro page)
FaqAccordion: function() {

    $('.fe_faq_item.active .fe_faq_a').show();

    $('.fe_faq_q').on('click', function() {
        var $item = $(this).closest('.fe_faq_item');
        var $answer = $item.find('.fe_faq_a');

        if ($item.hasClass('active')) {
            $item.removeClass('active');
            $answer.stop(true, true).slideUp(300);
        } else {
            $('.fe_faq_item.active').removeClass('active')
                .find('.fe_faq_a').stop(true, true).slideUp(300);

            $item.addClass('active');
            $answer.stop(true, true).slideDown(300);
        }
    });
},
        // Sticky Promo Bar (Pro page) - countdown + show/hide toggle
        StickyPromoBar: function() {
            var $bar = $('#fe_promoBar');
            if (!$bar.length) {
                return;
            }

            // Close / re-open toggle
            $('#fe_promoClose').on('click', function() {
                $bar.toggleClass('slide-up slide-down');
            });

            // Countdown timer (resets each visit)
            var $h = $bar.find('[data-h]');
            var $m = $bar.find('[data-m]');
            var $s = $bar.find('[data-s]');
            if (!$h.length) {
                return;
            }

            var total = 60 * 60; // 60 minutes, in seconds
            var pad = function(n) {
                return (n < 10 ? '0' : '') + n;
            };
            var tick = function() {
                var hrs = Math.floor(total / 3600);
                var min = Math.floor((total % 3600) / 60);
                var sec = total % 60;
                $h.text(pad(hrs));
                $m.text(pad(min));
                $s.text(pad(sec));
                if (total > 0) {
                    total--;
                }
            };
            tick();
            setInterval(tick, 1000);
        },








    };

    ShowcaseAI.init();
}(jQuery));
