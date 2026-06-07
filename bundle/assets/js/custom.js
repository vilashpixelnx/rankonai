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
            this.RevealOnScroll();
            this.StickyHeader();
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

        // Reveal on scroll (fade + slide-up, triggers once)
        RevealOnScroll: function() {
            var selector = [
                '.col-lg-12 > .text-center',
                '.col-12 > .text-center',
                '.fe_stat_card', '.home_slide_box', '.fe_newSearch_box',
                '.card-left-accent', '.big_idea_outer_left', '.big_idea_outer_right',
                '.fe_pillar_item', '.fe_feature_row', '.fe_roadmap_step',
                '.fe_audience_card', '.fe_bonus_item', '.fe_step_box',
                '.fe_price_card', '.fe_faq_item', '.fe_review_card',
                '.fe_allOne_img', '.fe_plugin_mockup', '.fe_bigDeal_robot_card',
                '.fe_income_box', '.fe_mback_box', '.fe_headsUp_box',
                '.fe_finalCta_box', '.fe_compare', '.fe_video_wrapper_with_icon'
            ].join(',');

            var els = [].slice.call(document.querySelectorAll(selector));
            if (!els.length) {
                return;
            }

            var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            // No animation: just show everything as-is.
            if (reduceMotion || !('IntersectionObserver' in window)) {
                els.forEach(function(el) {
                    el.classList.add('fe-reveal', 'fe-reveal-in');
                });
                return;
            }

            // Stagger items that share the same parent (e.g. cards in a grid).
            var groups = [];
            function groupIndex(parent) {
                for (var i = 0; i < groups.length; i++) {
                    if (groups[i].parent === parent) {
                        return groups[i].count++;
                    }
                }
                groups.push({ parent: parent, count: 1 });
                return 0;
            }

            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fe-reveal-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

            var vh = window.innerHeight || document.documentElement.clientHeight;

            els.forEach(function(el) {
                el.classList.add('fe-reveal');

                var idx = groupIndex(el.parentNode);
                if (idx > 0) {
                    el.style.transitionDelay = Math.min(idx * 0.12, 0.6) + 's';
                }

                var rect = el.getBoundingClientRect();
                if (rect.top < vh * 0.9 && rect.bottom > 0) {
                    // already on screen at load -> reveal instantly (no flash)
                    el.classList.add('fe-reveal-in');
                } else {
                    observer.observe(el);
                }
            });
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







    };

    ShowcaseAI.init();
}(jQuery));
