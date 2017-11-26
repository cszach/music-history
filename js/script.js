/**
 * All main activities of the presentation
 */
function main() {

    // Different animations for different platforms
    if (is.desktop()) {
        $("#credits").children("h2").hover(
            function() {
                $(this).siblings().css("color", "rgba(255, 255, 255, 0.3)");
            },
            function() {
                $(this).siblings().css("color", "#fff");
            }
        );
    }
    else if (is.mobile()) {
        $("#credits").children("h2").on("click", function() {
            $(this).css("opacity", "0");
        });
    }

    /*Shared JavaScript actions*/

    // Just an animation for slide #credits
    Reveal.addEventListener("credit-rollback", function() {
        $("#credits").children("h2").css("padding-right", "6em");
    });

    Reveal.addEventListener("slide-02-back", function() {
        setTimeout(function() {
            $("#credits").children("h2").css("padding-right", "initial");
        }, 300);
    });
}

$(document).ready(main);
$(window).on("load", function() {
    if (is.mobile() || is.tablet() || is.not.desktop()) {  // Mobile devices
        Reveal.configure({height: '90%'});  // Set height to 90% mainly to serve portrait mode
    }

    // Enable navigation
    Reveal.configure({
        keyboard: true,
        touch: true,
    });

    $(".control-arrows").each(function() {
        this.style.setProperty("display", "initial", "important");
    });
});
