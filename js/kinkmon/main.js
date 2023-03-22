var pageInitFunctions = [];
var buildVersion = "build003";

pageInitFunctions.push(function() {
    initKinks();
    initScreenshot();
    initMobileStuff();
});

function initMobileStuff() {
    if (isMobile()) {
        $(".settingsStuff").hide();
        
        var viewedAlreadyCookie = $.cookie(buildVersion);

        if (viewedAlreadyCookie === undefined) {
            $("#mobileModal").modal("show");
            $(".continueButton").on("click", function(e) {
                $("#mobileModal").modal("hide");
                $.cookie(buildVersion, true);
            })
    
            $(".changeLogButton").on("click", function(e) {
                alert(`build 002 --> build 003\n
                Added Mobile View Mode
                Created this cool Modal`)
            })
    
            $(".creditsButton").on("click", function(e) {
                alert(`Credit to https://twitter.com/WishBerri @WishBerri on Twitter for the art`);
            })
        }
        
    }
}

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

function initScreenshot() {
    $(".screenshotButton").on("click", function(e) {
        e.preventDefault();
        var element = document.getElementById("kinkboard");
        html2canvas(element).then(function(canvas) {
            var link = document.createElement('a');
            link.download = 'filename.png';
            link.href = canvas.toDataURL()
            link.click(); 
        });
    })
    
}

function isMobile() {
    if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) {
            return true;
         } else {
            return false;
         }
}

function initKinks() {
    var json = $.ajax({
        url: "/json/images.json",
        type: "GET"
    }).done(function(resp) {
        var kinkboard = $(".kinkboard");
        var counter = 0;
        var row = $("<div>").addClass("row");
        var classApply = "col";
        if (!isMobile()) {
            classApply+= " offset-md-3";
        }

        var col = $("<div>").addClass(classApply);

        var maxCounter = 4;

        if (isMobile()) {
            maxCounter = 3;
        }
        
        for (var index in resp.kinkmon) {
            

            var type = (resp.kinkmon[index]);
            
            var image = $("<img>").attr("src", "/images/kinkmon/" + type.file).addClass("kinkimage");
            image.attr("style", "max-width:180px");
            if (isMobile()) {
                image.attr("style", "max-width:324.67px");
            }
            
            row.append(col)
            col.append(image);

            counter++;
            if (counter === maxCounter) {
                counter = 0;
                kinkboard.append(row);
                row = $("<div>").addClass("row");
                
                col = $("<div>").addClass(classApply);
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