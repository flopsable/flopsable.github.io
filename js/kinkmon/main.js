var pageInitFunctions = [];

pageInitFunctions.push(function() {
    initKinks();
});
/*
<div class="col">
            Column
          </div>
          <div class="col">
            Column
          </div>
          <div class="col">
            Column
          </div>
*/
function initKinks() {
    var json = $.ajax({
        url: "/json/images.json",
        type: "GET"
    }).done(function(resp) {
        var kinkboard = $(".kinkboard").find("div.row");
        for (var index in resp.kinkmon) {
            var type = (resp.kinkmon[index]);
            var col = $("<div>").addClass("col");
            var image = $("<img>").attr("src", "/images/kinkmon/" + type.file);
            image.attr("style", "max-width:300px");
            col.append(image);
            kinkboard.append(col);
        }
    })
}

$(document).ready(function(e) {
    for (index in pageInitFunctions) {
        pageInitFunctions[index]();
    }
});