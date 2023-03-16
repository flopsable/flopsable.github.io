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
        var  = $(".kinkboard");
        var counter = 0;
        var row = $("<div>").addClass("row");
        for (var index in resp.kinkmon) {
            

            var type = (resp.kinkmon[index]);
            var col = $("<div>").addClass("col");
            var image = $("<img>").attr("src", "/images/kinkmon/" + type.file);
            image.attr("style", "max-width:200px");
            col.append(image);
            row.append(col)
            if (counter === 5) {
                counter = 0;
                kinkboard.append(row);
                row = $("<div>").addClass("row");
            }
        }
    })
}

$(document).ready(function(e) {
    for (index in pageInitFunctions) {
        pageInitFunctions[index]();
    }
});