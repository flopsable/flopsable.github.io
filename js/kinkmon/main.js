pageInitFunctions.push(function() {
    initKinks();
});

function initKinks() {
    alert("Document Ready");
}

$(document).on("ready", function(e) {
    for (func in pageInitFunctions) {
        func();
    }
})