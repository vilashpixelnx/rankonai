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
            this.FAQAccordion();

        },

        /*---------------------- ShowcaseAI Functions Calling ----------------------*/



        // Footer Copyright
        FooterCopyright: function() {
            var yearEl = document.getElementById('currentYear');
            if (yearEl) {
                yearEl.textContent = new Date().getFullYear();
            }
        },

        // FAQ Accordion (one open at a time, smooth expand/collapse)
        FAQAccordion: function() {
            var $items = $('.fe_faq_item');
            if (!$items.length) {
                return;
            }
            $('.fe_faq_q').on('click', function() {
                var $btn = $(this);
                var $item = $btn.closest('.fe_faq_item');
                var willOpen = !$item.hasClass('fe_faq_open');

                // close all
                $items.removeClass('fe_faq_open');
                $items.find('.fe_faq_a').css('max-height', 0);
                $items.find('.fe_faq_q').attr('aria-expanded', 'false');

                // open clicked (if it was closed)
                if (willOpen) {
                    var $body = $item.addClass('fe_faq_open').find('.fe_faq_a');
                    $body.css('max-height', $body.prop('scrollHeight') + 'px');
                    $btn.attr('aria-expanded', 'true');
                }
            });

            // keep an open item's height correct on resize
            $(window).on('resize', function() {
                var $open = $('.fe_faq_item.fe_faq_open .fe_faq_a');
                if ($open.length) {
                    $open.css('max-height', $open.prop('scrollHeight') + 'px');
                }
            });
        },








    };

    ShowcaseAI.init();
}(jQuery));
