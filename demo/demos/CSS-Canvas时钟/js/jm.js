var ang = 180;

$(function () {
    $('.toggle').click(function (e) {
        e.preventDefault(); // The flicker is a codepen thing
        $(this).toggleClass('toggle-on');
        on_off == "on" ? on_off = "off" : on_off = "on";
    });
    
    $("#ryWrap").click(function(){
        $("#ry").css("transform","rotate("+ang+"deg)");
        if (ang%360 == 0){
            $("body").css("backgroundColor","#fff");
        }else {
             $("body").css("backgroundColor","#141219");
        }
        ang+=180;        
    });

    $("#mode span").click(function (e) {
        e.preventDefault();
        $(".sele").removeClass("sele");
        $(this).addClass("sele");
        mode = e.target.id;
        endTime = new Date().getTime() + 360000000;
        startTime = new Date().getTime();
        timeZt = 0;
        alt = 1;
        if (e.target.id == "ticking"){
            $("#dateInput").slideDown(500).css("display","inline-block");
        }else{
            $("#dateInput").slideUp(500);
        }
    });
    
    $(".year").click(function(){
        $(".year").toggleClass("xz");
        if ($("#year").css("width")== '1px'){
            $("#year").stop();
            $("#year").val("Say Hi");
            $("#year").animate({width:40},500);
            $(".year").animate({opacity:0},250,function(){                
                $(".year").html("Y");
                 $(".year").css({fontSize:12});
                $(".year").animate({opacity:1},250);
            });
        }else if ($("#year").css("width")== '40px'){
            $("#year").stop();
            $("#year").animate({width:1},500,function(){
                $("#year").val("");
            });
            $(".year").animate({opacity:0},250,function(){
                $(".year").html("+");
                $(".year").css({fontSize:14});
                $(".year").animate({opacity:1},250);
            });
        }        
    });
    
    $("#go").click(function(){
        timeZt = 0;
        alt = 1;
        //按下效果
        $("#go").css({"backgroundColor":"rgb(122, 167, 208)"}).animate({height:20},100,function(){
            $("#go").css({"backgroundColor":"#B9D9F5"});
        });    
        //时间处理
        var h = $("#hour").val()*3600;
        var m = $("#minute").val()*60;
        var s = $("#sec").val()*1; //必须要转化为数字 
        if ( h>=0 && h/3600<=99 && m>=0 && m/60 <= 60 && s>=0&& s<=60){
            if ($("#chek")[0].checked){
                //选中则为日期
                var yNow = new Date().getFullYear();
                var mNow = new Date().getMonth();
                var dNow = new Date().getDate();
                var hNow = new Date().getHours;
                var toNow = new Date(yNow,mNow,dNow).getTime();
                var lossNow = new Date().getTime() - toNow;            
                if ((h+m+s)*1000 > lossNow){
                    endTime = (h+m+s)*1000 +toNow ;
                }else{
                    endTime = (h+m+s)*1000 +toNow + 86400000; //低于当前时间自动增加24小时
                }            
            }else{
                //没选中则为时间
            endTime = (h+m+s)*1000 + new Date().getTime() ;
            }
        }else{
            alert("输入不正确");
        }
        
    });
    
    $("#dateInput input[type=text]").keyup(function(e){
        if(e.target.id == "hour" ){            
            if ( !($(this).val() >0  && $(this).val() < 99)){
               alert("请输入0-99之间的数字");
            }
        }
        if(e.target.id == "minute" || e.target.id == "sec"){
            if ( !($(this).val() >0  && $(this).val() < 60)){
               alert("请输入0-60之间的数字");
            } 
        }
    });

});