(function(a){a.fn.airport=function(g,n){var b=a.extend({transition_speed:1000,loop:true,fill_space:false,colors:null},n),m=a(this),j=["a","b","c","d","e","f","g"," ","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","-","1","2","3","4","5","6","7","8","9","0"],h,c,d=0,i=g.length,f=g.length;function e(p,o){return p+new Array(o-p.length+1).join(" ")}m.empty();while(i--){if(g[i].length>d){d=g[i].length}}while(f--){g[f]=e(g[f],d)}h=d;while(h--){var k=document.createElement("span");k.className="c"+h;m.prepend(k)}if(b.colors){c=b.colors.replace(/\s+/g,"").split(",")}function l(x,w,v,u){var q=m.find(".c"+x),r=g[v]?g[v].substring(u,u+1):null,p,s,o=g[v]?a.trim(g[v]).length:null,t=g[v-1]?a.trim(g[v-1]).length:a.trim(g[0]).length;if(v>=g.length){if(!b.loop){clearTimeout(p);return}p=setTimeout(function(){l(0,0,0,0)},10)}else{if(u>=d){p=setTimeout(function(){if(b.colors){s=c[~~(Math.random()*c.length)];m.css("color",s.substring(0,1)==="#"?s:"#"+s)}l(0,0,v+1,0)},b.transition_speed)}else{q.html((j[w]===" ")?"&nbsp;":j[w]);p=setTimeout(function(){if(w>j.length){l(x+1,0,v,u+1)}else{if(j[w]!==r.toLowerCase()){l(x,w+1,v,u)}else{q.html((r===" "&&b.fill_space)?"&nbsp;":r);if(o<t){if(x>o){for(x;x<t;x++){m.find(".c"+x).html("")}u=d}}l(x+1,0,v,u+1)}}},10)}}}l(0,0,0,0)}})(jQuery);

/*TICKER add your text here*/

//$(".loader").airport([ "ideate","innovate","revolutionize", ]);

nextTab = '#highlights';
$(function() {
  if ($(window).scrollTop() > $(nextTab).offset().top) {
        $('.navbar').removeClass("navbar-fixed-bottom");//css('position', 'fixed');
        $('.navbar').addClass("navbar-fixed-top");//css('top', '0');
        $('.nav-arrow').removeClass('glyphicon-chevron-down');
        $('.nav-arrow').addClass('glyphicon-home');
        $("#nextsection").attr("href", '#home');
    }
  if(window.innerWidth < 500)
  {
    $('.navbar').removeClass('navbar-fixed-bottom');
    $('.navbar').addClass('navbar-fixed-top');
  }
});

$(window).scroll(function () {
    winHeight = $(window).height();
    if ($(window).scrollTop() > $(nextTab).offset().top-500) {
        $('.navbar').removeClass("navbar-fixed-bottom");//css('position', 'fixed');
        $('.navbar').addClass("navbar-fixed-top");//css('top', '0');
        $('.nav-arrow').removeClass('glyphicon-chevron-down');
        $('.nav-arrow').addClass('glyphicon-home');
        $("#nextsection").attr("href", '#home');
    }
    else if($(window).scrollTop() < $(nextTab).offset().top-500) {
        $('.navbar').removeClass("navbar-fixed-top");//css('position', 'fixed');
        $('.navbar').addClass("navbar-fixed-bottom");//css('top', '0');
        $('.nav-arrow').removeClass('glyphicon-home');
        $('.nav-arrow').addClass('glyphicon-chevron-down');
        $("#nextsection").attr("href", '#highlights');
       
    }
});

        var numberOfBlocks = $('#blocks').children().size();
        verticalBlockWidth = $('#blocks');
        var highlightsOriginal = verticalBlockWidth.width()/numberOfBlocks -1;
        var highlightsExpanded = verticalBlockWidth.width()*(1 - (0.2*(numberOfBlocks - 1))) -1;
        var highlightsShrunk = verticalBlockWidth.width()*0.2;
        function changeLook(currentBlock) {
          $(currentBlock + ' .top h3').css({'color':'white'});
        }

        function revertLook(currentBlock , blockNumber) {
          $(currentBlock + ' .top h3').css({'color':'black'});
        }
        $('.block').mouseenter(function() {
          $('.block').css({'width':highlightsShrunk});
          $('#'+this.id).css({'width':highlightsExpanded});
        });
        $('#nites').mouseleave(function() {
          $('.block').css({'width':highlightsOriginal});
        });

//function for smooth scroll to link
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      var loc = target.offset().top - 40;
      if (target.length) {
        $('html,body').animate({
          scrollTop: loc
        }, 1500);
        return false;
      }
    }
  });
});
        var descriptionDisplayed = 0;
        var numberOfShows = $('#shows').children().size();
        var horizontalBlock = $('#lectures');
        var heightOriginal = horizontalBlock.height() / numberOfShows; //20%
        var heightExpanded = horizontalBlock.height()*(1 - (0.05*(numberOfShows - 1)));   
        var heightShrunk = horizontalBlock.height()*0.05; //10%
        $(document).ready(function() {
          $('.show').css({'height':heightOriginal});
        });
        function pushUpHeading() {
          $('.title').css({'top':'0.02em'});
        }
        function pushDownHeading() {
          $('.title').css({'top':'0.3em'});
        }
        function updateShow(currentShow) {
            $('.show').css({'height':heightShrunk});
            $('.show .title').css({'font-size':'0.7em'});
            $('#' + currentShow + ' .title').css({'font-size':'2em'});
            $('#lectures').css({'background-image':'url(../assetsMain2014/img/'+ currentShow +'.jpg)'});
            $('#' + currentShow).css({'height':heightExpanded});
            $('#' + currentShow + ' .page-description').delay(400).fadeIn(100);
        }
        function revertBackShow(currentShow) {
            $('.show .title').css({'font-size':'2em'});
            $('#' + currentShow + ' .page-description').fadeOut(10);
            $('#lectures').css({'background-image':'url(../assetsMain2014/img/lectures.jpg)'});
            $('.show').delay(400).css({'height':heightOriginal});
        }
        function clearDescriptions() {
            $('.page-description').fadeOut(10);
        }
        var callbacks = $.Callbacks();
        $('.show').click(function() {
            clearDescriptions();
            callbacks.add(pushUpHeading);
            callbacks.add(updateShow(this.id));
            callbacks.fire();
        });
        $('#lectures').mouseleave(function() {
            clearDescriptions();
            callbacks.add(pushDownHeading);
            callbacks.add(revertBackShow(this.id));
            callbacks.fire();
        });


$(document).ready(function() {
  var numberOfShows = $('#shows').children().size();
  var resizedHeight = ($('#lectures').height() / numberOfShows) + 'px';
  $('.show').css({'height':resizedHeight});
  //alert(resizedHeight);
  var numberOfBlocks = $('#blocks').children().size();
  var resizedHeight = ($('#blocks').width() / numberOfBlocks)-1 + 'px';
  $('.block').css({'width':resizedHeight});
  //alert(resizedHeight);

});

$(function() {
  // IE detect
  function iedetect(v) {
    var r = RegExp('msie' + (!isNaN(v) ? ('\\s' + v) : ''), 'i');
    return r.test(navigator.userAgent);
  }
  // For mobile screens, just show an image called 'poster.jpg'. Mobile
  // screens don't support autoplaying videos, or for IE.
  if(screen.width < 800 || iedetect(8) || iedetect(7) || 'ontouchstart' in window) {
  
    (adjSize = function() { // Create function called adjSize
      
      $width = $(window).width(); // Width of the screen
      $height = $(window).height(); // Height of the screen
      
      // Resize image accordingly
      $('#home').css({
        'background-image' : 'url(./assetsMain2014/img/background.jpg)', 
        'background-size' : 'cover', 
        'width' : $width+'px', 
        'height' : $height+'px'
      });
      
      // Hide video
      $('video').hide();
      
    })(); // Run instantly
    
    // Run on resize too
    $(window).resize(adjSize);
  }
  else {

    // Wait until the video meta data has loaded
    $('#home video').on('loadedmetadata', function() {
      
      var $width, $height, // Width and height of screen
        $vidwidth = this.videoWidth, // Width of video (actual width)
        $vidheight = this.videoHeight, // Height of video (actual height)
        $aspectRatio = $vidwidth / $vidheight; // The ratio the video's height and width are in
            
      (adjSize = function() { // Create function called adjSize
              
        $width = $(window).width(); // Width of the screen
        $height = $(window).height(); // Height of the screen
              
        $boxRatio = $width / $height; // The ratio the screen is in
              
        $adjRatio = $aspectRatio / $boxRatio; // The ratio of the video divided by the screen size
              
        // Set the container to be the width and height of the screen
        $('#home').css({'width' : $width+'px', 'height' : $height+'px'}); 
              
        if($boxRatio < $aspectRatio) { // If the screen ratio is less than the aspect ratio..
          // Set the width of the video to the screen size multiplied by $adjRatio
          $vid = $('#home video').css({'width' : $width*$adjRatio+'px'}); 
        } else {
          // Else just set the video to the width of the screen/container
          $vid = $('#home video').css({'width' : $width+'px'});
        }
                 
      })(); // Run function immediately
            
      // Run function also on window resize.
      $(window).resize(adjSize);
            
    });
  }
  
});