function main() {
    if (is.chrome()) {
        $("#_02").children("h2").hover(
            function() { 
                $(this).css("padding-right", "10rem");
            },
            function() {
                $(this).css("padding-right", "initial");
            }
        );
    }
}

$(document).ready(main);
