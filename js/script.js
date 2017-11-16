function main() {
    $("#_02").children("h2").hover(
        function() { 
            $(this).css("padding-right", "1.5em");
        },
        function() {
            $(this).css("padding-right", "initial");
        }
    );
}

$(document).ready(main);
