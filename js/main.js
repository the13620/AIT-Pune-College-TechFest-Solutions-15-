var loaded = false;

function loaderScreen() {
    $('body').addClass('loaded').css({
        'overflow-y': 'inherit'
    });
    $('#loader-wrapper').remove();
    $("html").niceScroll();
    new Image().src = "../images/fb1.png";
    new Image().src = "../images/tw1.png";
    new Image().src = "../images/yt1.png";
    new Image().src = "../images/gp1.png";
}
window.onload = function() {
    loaded = true;
    loaderScreen();
};
setTimeout(function() {
    if (!loaded) {
        loaderScreen();
    }
}, 1500);

jQuery(document).ready(function($) {
    "use strict";
    $('.viva-nav').animate({
        left: '-200px'
    });
    $('#viva-hat').hover(function() {
        $(this).attr('src', $('#viva-hat').data('alt-src'));
    }, function() {
        $(this).attr('src', $('#viva-hat').data('init-src'));
    });

    $('.viva-nav .handle').click(function menul(e) {
        e.preventDefault();
        var a = $('.viva-nav');
        if (a.css('left') === '-200px') {
            $('.viva-nav').animate({
                left: '0px'
            })
            $('#viva-hat').attr("src", $('#viva-hat').data('alt-src'));
            $('#viva-hat').hover(function() {
                $(this).attr('src', $('#viva-hat').data('alt-src'));
            }, function() {
                $(this).attr('src', $('#viva-hat').data('alt-src'));
            });
        } else {
            $('.viva-nav').animate({
                left: '-200px'
            })
            $('#viva-hat').attr("src", $('#viva-hat').data('init-src'));
            $('#viva-hat').hover(function() {
                $(this).attr('src', $('#viva-hat').data('alt-src'));
            }, function() {
                $(this).attr('src', $('#viva-hat').data('init-src'));
            });
        }
    });
    $('body').click(function(evt) {
        if ($(evt.target).attr('class') == "viva-nav")
            return;
        if ($(evt.target).closest('.viva-nav').length)
            return;
        if (($('.viva-nav').css('left') === '0px')) {
            $('.viva-nav').animate({
                left: '-200px'
            })
            $('#viva-hat').attr("src", $('#viva-hat').data('init-src'));
        }
    });
});


vivacity = {
    viva: {
        init: function() {

            function changeText() {
                if ($(window).width() > 800) {
                    $("#sentence").css({
                        "visibility": "visible"
                    });
                    var terms = ['4 DAYS OF AWESOMENESS', 'DAYS WHEN LIMITS ARE PUSHED', 'DAYS WHEN MIND IS FEARLESS', 'DAYS WITH NEW BEATS & NEW MOVES', 'WHEN THE AIR IS CHANGED', 'THE SPRITS ARE HIGH', 'THE CREATIVITY IS UNFATHOMABLE', 'A REBEL AGAINST THE MUNDANE', 'CROSADE FOR ANGRY AND NEW', 'MORE HEADS, A GREATER SHOW', 'THE SPECTACLE SHALL BE POMPOUS'];

                    function rotateTerm() {
                        var ct = $("#swap").data("term") || 0;
                        $("#swap").data("term", ct == terms.length - 1 ? 0 : ct + 1).text(terms[ct])
                            .fadeIn().delay(2000).fadeOut(200, rotateTerm);
                    }
                    $(rotateTerm);
                } else {
                    $("#sentence").css({
                        "visibility": "hidden"
                    });
                }
            };
            $(function() {
                changeText();
                $(window).resize(function() {
                    changeText();
                });
            });
            $(function() {
                $("#vid-left, #vid-right").hover(function() {
                    $(this).animate({
                        opacity: '1'
                    });
                    this.play();
                }, function() {
                    $(this).animate({
                        opacity: '0.2'
                    });
                    this.pause()
                });
            });
            (function() {
                var $frame = $('#effects');
                var $wrap = $frame.parent();

                // Call Sly on frame
                $frame.sly({
                    horizontal: 1,
                    itemNav: 'basic',
                    smart: 1,
                    keyboardNavBy: 'items',
                    activateMiddle: 1,
                    activateOn: 'click',
                    mouseDragging: 1,
                    touchDragging: 1,
                    releaseSwing: 1,
                    cycleBy: 'items', // Enable automatic cycling by 'items' or 'pages'.
                    cycleInterval: 3000, // Delay between cycles in milliseconds.
                    pauseOnHover: 1, // Pause cycling when mouse hovers over the FRAME.
                    startPaused: 0, // Whether to start in paused sate.      
                    startAt: 0,
                    scrollBar: $wrap.find('.scrollbar'),
                    scrollBy: 1,
                    speed: 300,
                    elasticBounds: 1,
                    easing: 'swing',
                    dragHandle: 1,
                    dynamicHandle: 1,
                    clickBar: 1,
                });

                // reload on resize

                $(window).resize(function(e) {

                    $frame.sly('reload');


                });


            }());


        }
    },
    sponsor: {
        init: function() {
            $('#sponsor-carousel').carousel({
                interval: 5000,
                keyboard: true
            });
            document.onkeydown = checkKey3;

            function checkKey3(y) {
                y = y || window.event;
                if (y.keyCode == '37') {
                    $('#sponsor-carousel').carousel('prev');
                } else if (y.keyCode == '39') {
                    $('#sponsor-carousel').carousel('next');
                }
            }

        }
    },
    gallery: {
        init: function() {

            $('.popup-link').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                },
                preload: [1, 1],
                disableOn: function() {
                    if ($(window).width() < 600) {
                        return false;
                    }
                    return true;
                },
                callbacks: {
                    close: function() {
                        $("html").niceScroll();
                        $('body').css('overflow', 'hidden');
                    },
                    open: function() {
                        $("html").niceScroll().remove();
                        $('html').css('overflow', 'hidden');
                        $('.mfp-wrap').css('overflow-y', 'hidden');
                    }
                }
            });

            (function() {

                $(window).load(function() {
                    // container
                    var $container = $('#portfolio-items');

                    function filter_projects(tag) {
                        // filter projects
                        $container.isotope({
                            filter: tag
                        });
                        // clear active class
                        $('li.act').removeClass('act');
                        // add active class to filter selector
                        $('#portfolio-filter').find("[data-filter='" + tag + "']").parent().addClass('act');
                    }
                    if ($container.length) {
                        // conver data-tags to classes
                        $('.project').each(function() {
                                var $this = $(this);
                                var tags = $this.data('tags');
                                if (tags) {
                                    var classes = tags.split(',');
                                    for (var i = classes.length - 1; i >= 0; i--) {
                                        $this.addClass(classes[i]);
                                    };
                                }
                            })
                            // initialize isotope
                        $container.isotope({
                            // options...
                            resizeable: true,
                            resizeContainer: true,
                            itemSelector: '.project',
                            layoutMode: 'fitRows'
                                //layoutMode   : 'cellsByRow'
                        });

                        // filter items
                        $('#portfolio-filter li a').click(function() {
                            var selector = $(this).attr('data-filter');
                            filter_projects(selector);
                            return false;
                        });

                        if (window.location.hash != '') {
                            filter_projects('.' + window.location.hash.replace('#', ''));
                        }
                    }

                })



            })();
        }
    },
    events: {
        init: function() {

            $("#s21, #s31, #s41, #s51, #s61, #s71, #s81, #s91, #s101").load("eventslides/1.html");
            $("#s22, #s32, #s42, #s52, #s62, #s72, #s82, #s92, #s102").load("eventslides/2.html");
            $("#s23, #s33, #s43, #s53, #s63, #s73, #s83, #s93, #s103").load("eventslides/3.html");
            $("#s24, #s34, #s44, #s54, #s64, #s74, #s84, #s94, #s104").load("eventslides/4.html");
            $("#s25, #s35, #s45, #s55, #s65, #s75, #s85, #s95, #s105").load("eventslides/5.html");
            $("#s26, #s36, #s46, #s56, #s66, #s76, #s86, #s96, #s106").load("eventslides/6.html");
            $("#s27, #s37, #s47, #s57, #s67, #s77, #s87, #s97, #s107").load("eventslides/7.html");
            $("#s28, #s38, #s48, #s58, #s68, #s78, #s88, #s98, #s108").load("eventslides/8.html");
            $("#s29, #s39, #s49, #s59, #s69, #s79, #s89, #s99, #s109").load("eventslides/9.html");
            $("#s30, #s40, #s50, #s60, #s70, #s80, #s90, #s100, #s110").load("eventslides/10.html");
            $("#e22, #e32, #e42, #e52, #e62, #e72, #e82, #e92, #e102").load("eventslides/11.html");
            $('#event-carousel').carousel({
                interval: false
            });

            document.onkeydown = checkKey;

            function checkKey(e) {
                e = e || window.event;
                if (e.keyCode == '38' || e.keyCode == '37') {
                    $('#event-carousel').carousel('prev');
                } else if (e.keyCode == '40' || e.keyCode == '39') {
                    $('#event-carousel').carousel('next');
                }
            }
            $('#event-carousel').bind('mousewheel', function(f) {
                if (f.originalEvent.wheelDelta / 120 > 0)
                    $(this).carousel('prev');
                else
                    $(this).carousel('next');
            });


            $(window).scroll(function() {
                if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                    $('#event-carousel').carousel('next');
                    window.scrollBy(0, -1);
                }
            });
            $(window).scroll(function() {
                if ($(window).scrollTop() == 0) {
                    $('#event-carousel').carousel('prev');
                    window.scrollBy(0, 1);
                }
            });
            var $modal = $('#ajax-modal');

            $('#events .panel, #events .slide-items').on('click', function() {
                // create the backdrop and wait for next modal to be triggered
                $this = $(this);
                $('body').modalmanager('loading');

                setTimeout(function() {
                    $modal.load($this.find('a').attr('href'), '', function() {
                        $modal.modal();
                        $modal.removeClass('hide');
                        $modal.find(".close").on('click', function() {});
                    });
                }, 5);
            });

            $modal.on('click', '.update', function() {
                $modal.modal('loading');
                setTimeout(function() {
                    $modal
                        .modal('loading')
                        .find('.modal-body')
                        .prepend('<div class="alert alert-info fade in">' +
                            'Updated!<button type="button" class="close" data-dismiss="alert">&times;</button>' +
                            '</div>');
                }, 5);
            });
        }
    },
    contact: {
        init: function() {

            $('#carousel-contact-1').carousel({
                interval: false,
                keyboard: true
            });
            $('#carousel-contact-2').carousel({
                interval: false,
                keyboard: true
            });
            $('#carousel-contact-3').carousel({
                interval: false,
                keyboard: true
            });

            var form = $('.contact-form');
            form.submit(function() {
                "use strict";
                $this = $(this);
                $.post($(this).attr('action'), function(data) {
                    $this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
                }, 'json');
                return false;
            });

            var checkKey2;

            document.onkeydown = checkKey2;
            var $tabs = $('.tabs-right li');

            function checkKey2(c) {
                c = c || window.event;
                if (c.keyCode == '37') {
                    $('#carousel-contact-1, #carousel-contact-2, #carousel-contact-3').carousel('prev');
                } else if (c.keyCode == '39') {
                    $('#carousel-contact-1, #carousel-contact-2, #carousel-contact-3').carousel('next');
                }
                /* else if (c.keyCode == '38') {
                                    $tabs.filter('.active').prev('li').find('a[data-toggle="tab"]').tab('show');
                                } else if (c.keyCode == '40') {
                                    $tabs.filter('.active').next('li').find('a[data-toggle="tab"]').tab('show');
                                }*/
            }

            // Google Map Customization
            (function() {

                var map;


                map = new GMaps({
                    el: '#gmap',
                    lat: 26.936418,
                    lng: 75.923837,
                    scrollwheel: false,
                    zoom: 12,
                    mapTypeControl: false,
                    clickable: false
                });

                var image = 'images/map-icon.png';
                map.addMarker({
                    lat: 26.936418,
                    lng: 75.923837,
                    icon: image,
                    animation: google.maps.Animation.DROP,
                    verticalAlign: 'bottom',
                    horizontalAlign: 'center',
		    border: '0',
                    backgroundColor: '#2466dd',
                });


                var styles = [{
                        featureType: "all",
                        stylers: [{
                            saturation: -80
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{
                            hue: "#00ffee"
                        }, {
                            saturation: 50
                        }]
                    }

                ];

                map.addStyle({
                    styledMapName: "Styled Map",
                    styles: styles,
                    mapTypeId: "map_style"
                });

                map.setStyle("map_style");
            }());
        }
    }
}

UTIL = {

    fire: function(func, funcname, args) {

        var namespace = vivacity; // indicate your obj literal namespace here

        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function') {
            namespace[func][funcname](args);
        }

    },

    loadEvents: function() {

        var bodyId = document.body.id;

        // hit up common first.
        UTIL.fire('common');

        // do all the classes too.
        $.each(document.body.className.split(/\s+/), function(i, classnm) {
            UTIL.fire(classnm);
            UTIL.fire(classnm, bodyId);
        });

        UTIL.fire('common', 'finalize');

    }

};

// kick it all off here 
$(document).ready(UTIL.loadEvents);


//Set height of sections to window height
$(function() {
    $("#loader-wrapper,#sponsor, #explore, #home, .viva-nav, #frame, video, .typeform-widget").each(function() {
        var $this = $(this);
        $this.css({
            'height': ($(window).height()) + 'px'
        });
        /*Recalculate on window resize*/
        $(window).resize(function() {
            $this.css({
                'height': ($(window).height()) + 'px'
            });
        });
    });
});

//some css fixes
$(function() {
    $("#contact-section").css({
        "height": ($("#contact-tabs").height()) + 'px'
    });
    $("#contact-section").css({
        "min-height": ($("#contact-tabs").height()) + 'px'
    });
    /*Recalculate on window resize*/
    $(window).resize(function() {
        $("#contact-section").css({
            "height": ($("#contact-tabs").height()) + 'px'
        });
        $("#contact-section").css({
            "min-height": ($("#contact-tabs").height()) + 'px'
        });
    });
});


//smooth-scroll
if (!document.body.className.match('contact')) {
    $(function() {
        $('a[href*=#]').each(function() {
            $(this).on("click", function() {
                if ($(this).attr('href') == '#') {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 500);
                } else {
                    var target = $('a[name="' + $(this).attr('href') + '"],' + $(this).attr('href')),
                        targetOffset = target.offset().top;
                    if (targetOffset >= 1) {
                        $('html, body').animate({
                            scrollTop: targetOffset - 70
                        }, 1000);
                    }
                }
            });
        });
    });
}
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "../../connect.facebook.net/en_US/sdk.js#xfbml=1&appId=1389241191370840&version=v2.0";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$('.animated').addClass("animhide");
jQuery(document).ready(function($) {
    $('.animhide').appear(function() {
        $(this).each(function() {
            $(this).css('visibility', 'visible');
            $(this).addClass($(this).data('type'));
        });
    }, {
        accY: -150
    });
});