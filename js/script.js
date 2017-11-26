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

// Allow navigation after the page finishes loading
// No one wants to view a half-loaded presentation
$(window).on("load", function() {
    Reveal.configure({
        keyboard: true,
    });
    $(".control-arrows").each(function() {
        this.style.setProperty("display", "initial", "important");
    });
});
