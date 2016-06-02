$(function () {
    $("#panel input").focus();
    //切换list
    $("#list li").mouseover(function () {
        $("#list li").removeClass("li_bgc").show();
    });

    $("#list li").click(function () {
        $("#list li").removeClass("li_bgc").hide();
        $(this).addClass("li_bgc").show();
    });


    //搜索建议 
    $(document).keyup(function () {
        $.getJSON("demo.js", function (data) {
            console.log(data.demo.suggest);
            var html ="";
            for (var i = 0; i < data.demo.suggest.length; i++) {
                html += "<li>"+data.demo.suggest[i] + "</li>";
            }
           $("#suggest ul").html(html);
        });
    })


    $("#suggest ul").delegate("li", "click", function () {
        var tab = $(".li_bgc").text();
        console.log(tab);
        if (tab == "宝 贝") {
            location.href = "https://s.taobao.com/search?q=" + $(this).text();
        } else if (tab == "店 铺") {
            location.href = "https://shopsearch.taobao.com/search?q=" + $(this).text();
        }
    });
});