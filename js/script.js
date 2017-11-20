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
 * Procedure to place piano bubbles at the second vertical slide of slide 3
 */
function placePianoBubbles() {
    /* Put 'margin-left: auto' randomly */

    // Set transition duration to 1.5s to for bubbles' appreance animation
    $("#piano-bubbles").children(".bubble").css("transition", "1.5s");

    // Place bubbles to the left at first
    // Avoid having all the bubbles at the right side after some check-ins
    $("#piano-bubbles").children(".bubble").css("margin-left", "initial");

    // Set left margin to auto randomly
    $("#piano-bubbles").children(".bubble").each(function() {
        if (Math.floor(Math.random() * 2 + 1) == 1) {
            $(this).css("margin-left", "auto");
        }
    });

    changeFactor = null;  // The CSS rule to be changed (margin-left or margin-right), depended on the margin-left
    $("#piano-bubbles").children(".bubble").each(function() {
        changeFactor = ($(this).css("margin-left") == "auto") ? "margin-right" : "margin-left";
        $(this).css(changeFactor, Math.floor(Math.random() * 16 + 5) + "em");
    });

    // Stuffs to do at the end
    setTimeout(function() {
        // Clear variable afterwards
        delete changeFactor;
        // Set bubbles' transition to 0.8s
        $("#piano-bubbles").children(".bubble").css("transition", "0.8s");
        // Reset cursor type
        $("#piano-bubbles").children(".bubble").css("opacity", "0.5").css("cursor", "pointer");
    }, 100);

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
    
    // If the presentation is being viewed online, load embedded videos from YouTube.
    // If the presentation is being offline, load local videos.
    // The online version of this presentation is created using GitHub Pages.
    // GitHub does not allow big files (in this case, video files) so...
    if (is.online()) {
        $("#_03").children(".media").html("<iframe src=\"https://www.youtube.com/embed/A2WdjyKQ57A\" frameborder=\"0\" allowfullscreen></iframe>");
    }
    else {
        // This is just for my own purpose.
        // If you like, you can just as well download the youtube videos and link them.
        $("#_03").children(".media").html("<video controls>\n<source src=\"lib/video/Cristofori Piano.mp4\" type=\"video/mp4\">\n:(<br/>\nTrình duyệt web không hỗ trợ video.\n</video>");
    }

    // Just an animation for slide #2
    Reveal.addEventListener("credit-rollback", function() {
        $("#_02").children("h2").css("padding-right", "6em");
    });

    Reveal.addEventListener("slide-02-back", function() {
        setTimeout(function() {
            $("#_02").children("h2").css("padding-right", "initial");
        }, 300);
    });

    var numberOfPianoBubbles = null;

    Reveal.addEventListener("place-bubble", function() {
        if (numberOfPianoBubbles == null || numberOfPianoBubbles == 7) {
            placePianoBubbles();
            numberOfPianoBubbles = 7;
        }
    });

    // Play sound on #piano-bubbles > .bubble click
    $("#piano-bubbles").children(".bubble").on("click", function() {
        if ($(this).css("cursor") == "pointer") {
            // Create sound
            note = ["A", "B", "C", "D", "E", "F", "G"];
            piano = Synth.createInstrument("piano");
            piano.play(note[Math.floor(Math.random() * note.length)], Math.floor(Math.random() * 3 + 3), 2);
            delete note;
            delete piano;
            // Set opacity to 0 & Set cursor to initial
            // -> Fake bubble dissapear
            $(this).css("opacity", "0");
            $(this).css("cursor", "initial");
            numberOfPianoBubbles -= 1;
            if (numberOfPianoBubbles == 0) {
                setTimeout(function() {
                    placePianoBubbles();
                    numberOfPianoBubbles = 7;
                }, 800);
            }
        }
    });
}

$(document).ready(main);
