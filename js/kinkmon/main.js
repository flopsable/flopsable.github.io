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
        var kinkboard = $(".kinkboard");
        var counter = 0;
        var row = $("<div>").addClass("row");
        var col = $("<div>").addClass("col");
        
        for (var index in resp.kinkmon) {
            

            var type = (resp.kinkmon[index]);
            
            var image = $("<img>").attr("src", "/images/kinkmon/" + type.file).addClass("img-fluid");
            image.attr("style", "max-width:200px");
            
            row.append(col)
            col.append(image);
            counter++;
            if (counter === 4) {
                counter = 0;
                kinkboard.append(row);
                row = $("<div>").addClass("row");
                col = $("<div>").addClass("col");
            }
        }
    })
}

$(document).ready(function(e) {
    for (index in pageInitFunctions) {
        pageInitFunctions[index]();
    }
});