var pageInitFunctions = [];

pageInitFunctions.push(function() {
    initKinks();
});

function initKinks() {
    alert("Document Ready");
}

$(document).ready(function(e) {
    for (func in pageInitFunctions) {
        func();
    }
});