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

        },

        /*---------------------- ShowcaseAI Functions Calling ----------------------*/



        // Footer Copyright
        FooterCopyright: function() {
            document.getElementById('currentYear').textContent = new Date().getFullYear();
        },








    };

    ShowcaseAI.init();
}(jQuery));
