$(function(){


    // HEADER ---------------------------------------------------------------------------
    function menuToggleFn(clickedTarget){
        
        if(!clickedTarget.closest('li').hasClass('is-expanded')){
            clickedTarget.closest('li').siblings('li').removeClass('is-expanded');
            clickedTarget.closest('li').addClass('is-expanded');
        } else{
            clickedTarget.closest('li.depth').removeClass('is-expanded');
        }   
    }

    $('.gnb, .gnb_bg').on({
        'mouseenter' : function(){
            $('.header-bottom').addClass('is-expanded');
        },
        'mouseleave' : function(){
            $('.header-bottom').removeClass('is-expanded');
        },
    });
    $('.gnb a').on('focus', function(){
        $('.header-bottom').addClass('is-expanded');
    })
    $('.gnb').on('focusout', function(){
        setTimeout(function(){
            if(!$('.gnb').find('a:focus').length){
                $('.header-bottom').
                removeClass('is-expanded');
            }
        }, 0)
    });

    // MOB ---------------------------------------------------------------------------
    $('.header .btn-menu.mob').on('click', function(){
        if(!$('.header').hasClass('is-expanded')){
            $('.header').addClass('is-expanded');
            $(this).find('.blind').text('메뉴닫기');
        } else{
            $('.header').removeClass('is-expanded');
            $(this).find('.blind').text('메뉴열기');
        }
    })

    $('.mob-menu .gnb > ul > li > a, .mob-menu .gnb ul > li.depth > a').on('click', function(e){
        e.preventDefault();    

        menuToggleFn($(this));
    });

    // LNB ---------------------------------------------------------------------------
    function lnbBtnPositionSet(){
        if($('.container').hasClass('lnb-collapsed')){
            $('.btn-lnb').css('left', (Number($('.lnb').offset().left) * -1) + 'px');
        } else{            
            $('.btn-lnb').css('left', '');
        }        
    }

    $('.btn-lnb').on('click', function(){
        if(!$('.container').hasClass('lnb-collapsed')){
            $('.container').addClass('lnb-collapsed');
            $(this).find('.blind').text('메뉴열기');            
        } else{
            $('.container').removeClass('lnb-collapsed');
            $(this).find('.blind').text('메뉴닫기');
        }    

        lnbBtnPositionSet()    
    });

    $('.lnb ul > li.depth > a').on('click', function(e){
        e.preventDefault();    
        
        menuToggleFn($(this));
        $('.lnb .wrap').css('height', $('.lnb nav').outerHeight(true)); 
    })

    // SHOW/HIDE TOGGLE ----------------------------------------------------------------------
    $('[data-show]').on('click', function(e){
        e.preventDefault();

        var target  = $(this).data('show');

        if(!$('#' + target).hasClass('is-expanded')){
            $('#' + target).show().addClass('is-expanded');
        } else{
            $('#' + target).hide().removeClass('is-expanded');
        }

    })

    // FORM ----------------------------------------------------------------------

    $('.ipt input').each(function(index, item){
        if($(item).siblings('.btn-del').length){
            $(this).on({
                'input' : function(){
                    if($(this).val().length > 0){
                        $(this).siblings('.btn-del').show();
                    } else{
                        $(this).siblings('.btn-del').hide();
                    }
                },
                'focus' : function(){
                    if($(this).val().length > 0){
                        $(this).siblings('.btn-del').show();
                    } 
                }, 
                'keydown' : function(e){   
                    if(e.shiftKey && e.keyCode == 9){
                        $(this).siblings('.btn-del').hide();
                    }
                }
            });
        }
    })

    $('.btn-del').on({
        'click' : function(){
            $(this).siblings('input').val('');
            $(this).hide();
            $(this).siblings('input').focus();
        },
        'focusout' : function(){
            $(this).hide();
        }
    })


    // CALENDAR ----------------------------------------------------------------------
    var dateFormat = "mm/dd/yy";

    // Datepicker의 언어 설정
    $.datepicker.regional['ko'] = {
        closeText: '닫기',
        prevText: '이전',
        nextText: '다음',
        currentText: '오늘',
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        dayNames: ['일','월','화','수','목','금','토'],
        dayNamesShort: ['일','월','화','수','목','금','토'],
        dayNamesMin: ['일','월','화','수','목','금','토'],
        weekHeader: '주',
        dateFormat: 'yy-mm-dd',
        firstDay: 0,
        isRTL: false,
        showMonthAfterYear: true,
        yearSuffix: '년'
    };
    $.datepicker.setDefaults($.datepicker.regional['ko']);

    // 각 datepicker-container에 대해 초기화
    $('.calendar').each(function() {
        var from = $(this).find('input').first().datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 2
        }).on("change", function() {
            to.datepicker("option", "minDate", getDate(this));
        });

        var to = $(this).find('input').last().datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 2
        }).on("change", function() {
            from.datepicker("option", "maxDate", getDate(this));
        });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }
            return date;
        }
    });

    // LOAD / RESIZE ----------------------------------------------------------------------
    $(window).on('load resize', function(){
        var viewportWidth = window.innerWidth || $(window).width();


        // LNB ------------------------------------------------
        if($('.lnb').length && $(window).width() > 1024){

            if(viewportWidth < 1280){ // 1024~1280일때 LNB 닫기
                $('.container').addClass('lnb-collapsed'); 
            } 

            $('.lnb .wrap').css('height', $('.lnb nav').outerHeight(true)); 
            lnbBtnPositionSet();
        }

    });
    

});