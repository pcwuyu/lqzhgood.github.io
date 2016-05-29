/* global NexT: true */

$(document).ready(function () {

  initScrollSpy();
  NexT.utils.needAffix() && initAffix();
  initTOCDimension();

  function initScrollSpy () {
    var tocSelector = '.post-toc';
    var $tocElement = $(tocSelector);
    var activeCurrentSelector = '.active-current';

    $tocElement
      .on('activate.bs.scrollspy', function () {
        var $currentActiveElement = $(tocSelector + ' .active').last();

        removeCurrentActiveClass();
        $currentActiveElement.addClass('active-current');
      })
      .on('clear.bs.scrollspy', removeCurrentActiveClass);

    $('body').scrollspy({ target: tocSelector });

    function removeCurrentActiveClass () {
      $(tocSelector + ' ' + activeCurrentSelector)
        .removeClass(activeCurrentSelector.substring(1));
    }
  }

  function initAffix () {
    var headerHeight = $('.header-inner').height();
    var footerOffset = parseInt($('.main').css('padding-bottom'), 10);
    var sidebarTop = headerHeight + 10;

    $('.sidebar-inner').affix({
      offset: {
        top: sidebarTop,
        bottom: footerOffset
      }
    });

    $(document)
      .on('affixed.bs.affix', function () {
        updateTOCHeight(document.body.clientHeight - 100);
      });
  }

  function initTOCDimension () {
    var updateTOCHeightTimer;

    $(window).on('resize', function () {
      updateTOCHeightTimer && clearTimeout(updateTOCHeightTimer);

      updateTOCHeightTimer = setTimeout(function () {
        var tocWrapperHeight = document.body.clientHeight - 100;

        updateTOCHeight(tocWrapperHeight);
      }, 0);
    });

    // Initialize TOC Height.
    updateTOCHeight(document.body.clientHeight - 100);

    // Initialize TOC Width.
    var scrollbarWidth = NexT.utils.getScrollbarWidth();
    $('.post-toc').css('width', 'calc(100% + ' + scrollbarWidth + 'px)');
  }

  function updateTOCHeight (height) {
    height = height || 'auto';
    $('.post-toc').css('max-height', height);
  }

});

$(document).ready(function () {
  var html = $('html');
  var TAB_ANIMATE_DURATION = 200;
  var hasVelocity = $.isFunction(html.velocity);

  $('.sidebar-nav li').on('click', function () {
    var item = $(this);
    var activeTabClassName = 'sidebar-nav-active';
    var activePanelClassName = 'sidebar-panel-active';
    if (item.hasClass(activeTabClassName)) {
      return;
    }

    var currentTarget = $('.' + activePanelClassName);
    var target = $('.' + item.data('target'));

    hasVelocity ?
      currentTarget.velocity('transition.slideUpOut', TAB_ANIMATE_DURATION, function () {
        target
          .velocity('stop')
          .velocity('transition.slideDownIn', TAB_ANIMATE_DURATION)
          .addClass(activePanelClassName);
      }) :
      currentTarget.animate({ opacity: 0 }, TAB_ANIMATE_DURATION, function () {
        currentTarget.hide();
        target
          .stop()
          .css({'opacity': 0, 'display': 'block'})
          .animate({ opacity: 1 }, TAB_ANIMATE_DURATION, function () {
            currentTarget.removeClass(activePanelClassName);
            target.addClass(activePanelClassName);
          });
      });

    item.siblings().removeClass(activeTabClassName);
    item.addClass(activeTabClassName);
  });

  $('.post-toc a').on('click', function (e) {
    e.preventDefault();
    var targetSelector = NexT.utils.escapeSelector(this.getAttribute('href'));
    var offset = $(targetSelector).offset().top;

    hasVelocity ?
      html.velocity('stop').velocity('scroll', {
        offset: offset  + 'px',
        mobileHA: false
      }) :
      $('html, body').stop().animate({
        scrollTop: offset
      }, 500);
  });

  // Expand sidebar on post detail page by default, when post has a toc.
  NexT.motion.middleWares.sidebar = function () {
    var $tocContent = $('.post-toc-content');

    if (CONFIG.sidebar.display === 'post' || CONFIG.sidebar.display === 'always') {
      if ($tocContent.length > 0 && $tocContent.html().trim().length > 0) {
        NexT.utils.displaySidebar();        
      }
    }
  };
    
   
    // 下滑动右侧显示，上滑动右侧隐藏
    $("#sidebar").css("display","none");
    var a = "1";
    $(document).scroll(function () {
     //if (($(document).scrollTop() > 300) && ($("#sidebar").css("display") == "none")) {
     if (($(document).scrollTop() > 200) && ($("#sidebar").css("display") == "none") && $(".back-to-top-on").length > 0) {
         if (a == "1") {
             NexT.utils.displaySidebar();
             a = "0";
         }

         //大于 显示
     }
     //else if (($(document).scrollTop() <= 10) && ($("#sidebar").css("display") == "block")) {
     else if (($(document).scrollTop() <= 200) && ($("#sidebar").css("display") == "block") && $(".back-to-top-on").length == 0) {
         {
             if (a == "0") {
                 NexT.utils.displaySidebar();
                 a = "1";
             }
             //小于 隐藏
         }
     }
 });//自建结束
    
    
          
    
});
