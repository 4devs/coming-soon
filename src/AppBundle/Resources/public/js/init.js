/*-----------------------------------------------------------------------------------
 /*
 /* Init JS
 /*
 -----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {

    var bgImg = $(".intro").css('background-image').substr(-41, 40),
        finalDate = $('.main__counter').data('end_date'),
        counterHtml = $('.main__counter').data('counter');

    /*---------------------------------------------------- */
    /* Preloader
     ------------------------------------------------------ */
    $(window).load(function () {

        // will first fade out the loading animation
        $(".preloader__status").fadeOut("slow");

        // will fade out the whole DIV that covers the website.
        $(".preloader").delay(500).fadeOut("slow").remove();

    })

    /*----------------------------------------------------*/
    /* Backstretch Settings
     ------------------------------------------------------ */

    $('.intro').backstretch(bgImg);

    $('.locale-chooser__current').on('click', function (e) {
        $('.locale-chooser__select').toggle();
    });
    $('.locale-chooser').change(function () {
        $(this).siblings('p').text($(this).children('option:selected').text());
    });
    /*----------------------------------------------------*/
    /*  Placeholder Plugin Settings
     ------------------------------------------------------ */
    $('input, textarea').placeholder()


    /*----------------------------------------------------*/
    /* Final Countdown Settings
     ------------------------------------------------------ */

    $('.main__counter').countdown(finalDate)
        .on('update.countdown', function (event) {

            $(this).html(event.strftime(counterHtml));

            //$(this).html(event.strftime('<span class="main__counter_days main__counter_time">%D <em class="main__counter_text">days</em></span>' +
            //'<span class="main__counter_time">%H <em class="main__counter_text">hours</em></span>' +
            //'<span class="main__counter_time">%M <em class="main__counter_text">minutes</em></span>' +
            //'<span class="main__counter_time">%S <em class="main__counter_text">seconds</em></span>'));

        });


    /*----------------------------------------------------*/
    /* Smooth Scrolling
     ------------------------------------------------------ */

    $('.smoothscroll').on('click', function (e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 800, 'swing', function () {
            window.location.hash = target;
        });
    });


    /*----------------------------------------------------*/
    /*	Make sure that #intro height is
     /* equal to the browser height.
     ------------------------------------------------------ */

    $('.intro').css({'height': $(window).height()});
    $(window).on('resize', function () {
        $('.intro').css({'height': $(window).height()}).backstretch(bgImg);
        $('body').css({'width': $(window).width()});
    });


});