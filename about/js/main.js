window.onload = function () {
    
    $("#wrap").appendTo("body");

    var lmsArray = [];
    var lmsArrayTure = "73&83&71&78&69&77&85&73&76";
    var timer;

    $("body").keyup(function (e) {
        clearTimeout(timer);

        var key = e.which;
        if (key == 27 && $("#heart").css("opacity") == 1) {
            $(".colorEgg").animate({
                opacity: 0
            }, 1000);
        }
        lmsArray.unshift(key);

        var lmsStr = lmsArray.join("&");
        if (lmsStr.indexOf(lmsArrayTure) != -1) {
            lmsArray = [];
            $("#wrap").animate({
                opacity: 0.8
            }, 1000);
            $("#heart").animate({
                opacity: 1
            }, 1000);
        }

        timer = setTimeout(function () {
            lmsArray = [];
        }, 2000);

        console.log(lmsArray);

    });


}