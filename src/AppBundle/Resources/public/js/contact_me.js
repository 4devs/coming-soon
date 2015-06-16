$(function () {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            var formId = $($form).attr('id');

            $.ajax({
                url: $("#" + formId).attr('action'),
                type: "POST",
                data: $("#" + formId).serialize(),
                cache: false,
                success: function (data) {
                    if (data.status == 'error') {
                        $.each(data.error, function (index, value) {
                            var helpBlock = $('#' + formId + '_' + index).next();
                            var html = '<ul>';
                            for (var key in value) {
                                html += '<li>' + value[key] + '</li>';
                            }
                            html += '</ul>';
                            helpBlock.html(html);
                        });
                    } else {
                        // Success message
                        $('.success-subscribe').html("<strong>" + data.message + "</strong>");

                        //clear all fields
                        $('#' + formId).trigger("reset");
                    }
                },
                error: function () {

                    var email = $("#" + formId + "_email").val();

                    // Fail message
                    $('.success-subscribe').html("<strong>Sorry " + email + ", it seems that my mail server is not responding. Please try again later!</strong>");
                    //clear all fields
                    $('#' + formId).trigger("reset");
                }
            })
        },
        filter: function () {
            return $(this).is(":visible");
        }
    });

});


/*When clicking on Full hide fail/success boxes */
$('#contact_us_email_email').focus(function () {
    $('.success-subscribe').html('');
});
