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
        var col = $("<div>").addClass("col offset-md-3");
        
        for (var index in resp.kinkmon) {
            

            var type = (resp.kinkmon[index]);
            
            var image = $("<img>").attr("src", "/images/kinkmon/" + type.file).addClass("kinkimage");
            image.attr("style", "max-width:200px");
            
            row.append(col)
            col.append(image);

            counter++;
            if (counter === 4) {
                counter = 0;
                kinkboard.append(row);
                row = $("<div>").addClass("row");
                col = $("<div>").addClass("col offset-md-3");
            }
        }

        $(".kinkimage").on("click", function(e) {
            console.log($(this));
            var selected = $(this).hasClass("checked");
            console.log(selected)
            if(selected) {
                $(this).removeClass("checked");
                $(this).removeClass("border border-success border-5");
            } else {
                $(this).addClass("checked");
                $(this).addClass("border border-success border-5");
            }
        })
    })
}

$(document).ready(function(e) {
    for (index in pageInitFunctions) {
        pageInitFunctions[index]();
    }
});