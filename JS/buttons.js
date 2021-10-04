function buttonsTop () {
    var buttons = document.getElementsByClassName("buttons-opt");
    for (var each = 0; each < buttons.length; each++) {
        buttons[each].style = "top: " + each * 5 + "px";
    }
}