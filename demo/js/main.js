var txtObj;
$(function () {
    var lcolor = ["#ffc0cb","#9cddd2","#acd7ed","#acd7ed"];
    
//    右上×号函数
    $(".idTabs span").mouseover(function(){
        $("#shuoming").stop();
        $("#shuoming").show(750);
    });    $(".idTabs span").mouseout(function(){
        $("#shuoming").stop();
        $("#shuoming").hide(750);        
    });
    
//    li循环赋值函数
    $(".idTabs>li").each(function (index) {
        var _that = $(this);
        this.an = 0;
        this.lcolor=lcolor[index];
        console.log(this.lcolor);
        $(this).click(function () {
            if (this.an == "0") { //如果是当前则不切换
                $(".idTabs>li").each(function (index) {
                    $(this).css("z-index", 5 - index);
                    this.an = 0;
                });
                _that.css("z-index", "10");
                $(".demo").stop();
                $(".demo:visible").slideUp(750, function () {
                    $(".demo").eq(index).slideDown(750);
                });
                $("#strip").animate({width:1},750,function(){
                    $("#strip").css("background-color",_that[0].lcolor);
                    console.log(this.lcolor);
                    $("#strip").animate({width:550},750);
                });
                this.an = 1;
            }
        });
    });

    $(".idTabs>li")[0].an="1";
    //首页ALL点击标志位置1；
    
//    ajax异步调用
    getXML();

    function getXML() {
        $.ajax({
            url: "demos/list.xml"
            , cache: false
            , dataType: "xml"
            , success: function (xml) {
                $(xml).find("url").each(function () {
                    var text = $(this).text();
                    var li = $("<li>").addClass("info").append($("<div>").addClass("infoLeft").append("<a target='_blank' href='demos/" + $(this).text() + "'>" + $(this).text() + "</a>"));

                    var readme = function (text) {
                        txtObj = "";
                        $.ajax({
                            url: "demos/" + text + "/readme.txt"
                            , cache: false
                            , dataType: "text"
                            , async: false
                            , success: function (txt) {
                                txtObj = {
                                    info: txt.substring(0, txt.indexOf("-"))
                                    , guest: txt.substring(txt.indexOf("-") + 1, txt.indexOf("-", txt.indexOf("-") + 1))
                                };
                            }
                            , error: function () {
                                txtObj = "";
                            }
                        });
                    }(text);

                    var pinfo = $("<p>").addClass("demoInfo");
                    var pguest = $("<p>").addClass("demoGuest");
                    if (txtObj != "") {
                        var aguest = $("<a>").text(txtObj.guest).attr("target", "_blank").attr("href", 'demos/' + $(this).text() + '/readme.txt');
                        pinfo.text(txtObj.info);
                        pguest.append(aguest);
                    }
                    li.append($("<div>").addClass("infoRight").append(pinfo).append(pguest));

                    if (text.substring(0, text.indexOf("-")) == "CSS" || text.substring(0, text.indexOf("-")) == "HTML") {
                        $("#htmlDemo").append(li);
                    } else if (text.substring(0, text.indexOf("-")) == "JS") {
                        $("#jsDemo").append(li);
                    } else {
                        $("#otherDemo").append(li);
                    }

                    $("#allDemo").append(li.clone(true));;
                });
            }
        });
    }


});