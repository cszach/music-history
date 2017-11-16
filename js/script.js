function main() {
    $("#_02").children("h2").hover(
        function() { 
            $(this).css("padding-right", "2em");
        },
        function() {
            $(this).css("padding-right", "initial");
        }
    );
}

$(document).ready(main);
