/**
 * Function to check if the system for this presentation is valid.
 * Return 0 if current device is desktop and the presentation is being viewed in Google Chrome,
 * which can have more animations.
 * Return 1 if current device is iPad and the presentation is being viewed in Safari,
 * in which some of the presentation's animations are limited.
 * Return -1 if the current system is not at all valid.
 * 
 * @return {integer} An indicator integer
 */
function validSystem() {
    if (is.chrome() && is.desktop()) {
        return 0;
    }

    if (is.ipad() && is.safari()) {
        return 1;
    }

    return -1;
}

/**
 * All main activities of the presentation
 */
function main() {
    switch (validSystem()) {
        case 0:  // Chrome on PC
            $("#_02").children("h2").hover(
                function() {
                    $(this).siblings().css("color", "rgba(255, 255, 255, 0.3)");
                },
                function() {
                    $(this).siblings().css("color", "#fff");
                }
            );
            break;
        case 1:  // Safari on iPad
            $("#_02").children("h2").on("click", function() {
                $(this).fadeOut(1000);
            });
            break;
        case -1:  // Unsupported browser/device
            alertMsg = "Your browser and/or device is not supported.\n"
                + "If you are on a desktop device, view the presentation in Google Chrome or a Chrome-based web browser like Chromiun.\n"
                + "If you are on an iPad, view this in Safari.\nYou can proceed, however, you might see unexpected things";
            alert(alertMsg);
            delete alertMsg;
            break;
        default:
            location.reload();
    }


    /*Shared JavaScript actions*/

    // Just an animation for slide #2
    Reveal.addEventListener("credit-rollback", function() {
        $("#_02").children("h2").css("padding-right", "6em");
    });

    Reveal.addEventListener("slide-02-back", function() {
        setTimeout(function() {
            $("#_02").children("h2").css("padding-right", "initial");
        }, 300);
    });
    
    // If the presentation is being viewed online, load embedded videos from YouTube.
    // If the presentation is being offline, load local videos.
    // The online version of this presentation is created using GitHub Pages.
    // GitHub does not allow big files (in this case, video files) so...
    if (is.online()) {
        $("#_03").children(".media").html("<iframe src=\"https://www.youtube.com/embed/A2WdjyKQ57A\" frameborder=\"0\" allowfullscreen></iframe>");
    }
}

$(document).ready(main);
