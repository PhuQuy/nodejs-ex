var responsiveflag = false;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var isiPad = /iPad/i.test(navigator.userAgent);
var controller;
$(document).ready(function () {
	$("#categories_block_left li li a").wrapInner("<strong></strong>")
	$(".tab-content ul>li.first-in-line").each(function () {
	    $(this).before("<li class='clear'><span /></li>");
	})
	$('#inCartLayered').prepend($('#layer_cart, .layer_cart_overlay'));
	controller = new ScrollMagic();
	highdpiInit();
	responsiveResize();
	$(window).resize(responsiveResize);
	if (navigator.userAgent.match(/Android/i)) {
	    var viewport = document.querySelector('meta[name="viewport"]');
	    viewport.setAttribute('content', 'initial-scale=1.0,maximum-scale=1.0,user-scalable=0,width=device-width,height=device-height');
	    window.scrollTo(0, 1);
	}
	blockHover();
	




	if (typeof page_name != 'undefined' && !in_array(page_name, ['index', 'category'])) {

	    $(document).on('change', '.selectProductSort', function (e) {
	        if (typeof request != 'undefined' && request)
	            var requestSortProducts = request;
	        var splitData = $(this).val().split(':');
	        var url = '';
	        if (typeof requestSortProducts != 'undefined' && requestSortProducts) {
	            url += requestSortProducts;
	            if (typeof splitData[0] !== 'undefined' && splitData[0]) {
	                url += (requestSortProducts.indexOf('?') < 0 ? '?' : '&') + 'orderby=' + splitData[0] + (splitData[1] ? '&orderway=' + splitData[1] : '');
	                if (typeof splitData[1] !== 'undefined' && splitData[1])
	                    url += '&orderway=' + splitData[1];
	            }
	            document.location.href = url;
	        }
	    });
	    $(document).on('change', 'select[name="n"]', function () {
	        $(this.form).submit();
	    });
	    $(document).on('change', 'select[name="currency_payment"]', function () {
	        setCurrency($(this).val());
	    });
	}
	$(document).on('change', 'select[name="manufacturer_list"], select[name="supplier_list"]', function () {
	    if (this.value != '')
	        location.href = this.value;
	});
	$(document).on('click', '.back', function (e) {
	    e.preventDefault();
	    history.back();
	});
	jQuery.curCSS = jQuery.css;
	if (!!$.prototype.cluetip)
	    $('a.cluetip').cluetip({
	        local: true,
	        cursor: 'pointer',
	        dropShadow: false,
	        dropShadowSteps: 0,
	        showTitle: false,
	        tracking: true,
	        sticky: false,
	        mouseOutClose: true,
	        fx: {open: 'fadeIn', openSpeed: 'fast'}
	    }).css('opacity', 0.8);
	if (!!$.prototype.fancybox)
	    $.extend($.fancybox.defaults.tpl, {
	        closeBtn: '<a title="' + FancyboxI18nClose + '" class="fancybox-item fancybox-close" href="javascript:;"></a>',
	        next: '<a title="' + FancyboxI18nNext + '" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
	        prev: '<a title="' + FancyboxI18nPrev + '" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
	    });
	$(".alert.alert-danger").on('click', this, function (e) {
	    if (e.offsetX >= 16 && e.offsetX <= 39 && e.offsetY >= 16 && e.offsetY <= 34)
	        $(this).fadeOut();
	});
});
function highdpiInit() {
	if ($('.replace-2x').css('font-size') == "1px") {
		var els = $("img.replace-2x").get();
		for (var i = 0; i < els.length; i++) {
			src = els[i].src;
			extension = src.substr((src.lastIndexOf('.') + 1));
			src = src.replace("." + extension, "2x." + extension);
			var img = new Image();
			img.src = src;
			img.height != 0 ? els[i].src = src : els[i].src = els[i].src;
		}
	}
}
function scrollCompensate() {
	var inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";
	var outer = document.createElement('div');
	outer.style.position = "absolute";
	outer.style.top = "0px";
	outer.style.left = "0px";
	outer.style.visibility = "hidden";
	outer.style.width = "200px";
	outer.style.height = "150px";
	outer.style.overflow = "hidden";
	outer.appendChild(inner);
	document.body.appendChild(outer);
	var w1 = inner.offsetWidth;
	outer.style.overflow = 'scroll';
	var w2 = inner.offsetWidth;
	if (w1 == w2)w2 = outer.clientWidth;
	document.body.removeChild(outer);
	return (w1 - w2);
}
function responsiveResize() {
	compensante = scrollCompensate();
	if (($(window).width() + scrollCompensate()) <= 767 && responsiveflag == false) {
		accordion('enable');
		accordionFooter('enable');
		responsiveflag = true;
	}
	else if (($(window).width() + scrollCompensate()) >= 768) {
		accordion('disable');
		accordionFooter('disable');
		responsiveflag = false;
	}
}
function blockHover(status) {
	$(document).off('mouseenter').on('mouseenter', '.product_list.grid li.ajax_block_product .product-container', function (e) {
		if ('ontouchstart'in document.documentElement)
			return;
		if ($('body').find('.container').width() == 1170) {
			$(this).parent().addClass('hovered');
		}
	});
	$(document).off('mouseleave').on('mouseleave', '.product_list.grid li.ajax_block_product .product-container', function (e) {
		if ($('body').find('.container').width() == 1170)
			$(this).parent().removeClass('hovered');
	});
}

if (nbItemsPerLine != 'undefined' && nbItemsPerLineTablet != 'undefined') {
	var nbItemsPerLine = nbItemsPerLine;
	var nbItemsPerLineTablet = nbItemsPerLineTablet
} else {
	var nbItemsPerLine = '';
	var nbItemsPerLineTablet = '';
}

function dropDown() {
	elementClick = '#header .current';
	elementSlide = 'ul.toogle_content';
	activeClass = 'active';
	$(elementClick).on('click', function (e) {
		e.stopPropagation();
		var subUl = $(this).next(elementSlide);
		if (subUl.is(':hidden')) {
			subUl.slideDown();
			$(this).addClass(activeClass);
		} else {
			subUl.slideUp();
			$(this).removeClass(activeClass);
		}
		$(elementClick).not(this).next(elementSlide).slideUp();
		$(elementClick).not(this).removeClass(activeClass);
		e.preventDefault();
	});
	$(elementSlide).on('click', function (e) {
		e.stopPropagation();
	});
	$(document).on('click', function (e) {
	    e.stopPropagation();
	    var elementHide = $(elementClick).next(elementSlide);
	    $(elementHide).slideUp();
	    $(elementClick).removeClass('active');
	});

}

function accordionFooter(status) {
	if (status == 'enable') {
		$('#footer .footer-block h4').on('click', function () {
			$(this).toggleClass('active').parent().find('.toggle-footer').stop().slideToggle('medium');
		})
		$('#footer').addClass('accordion').find('.toggle-footer').slideUp('fast');
	}
	else {
		$('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
		$('#footer').removeClass('accordion');
	}
}

function accordion(status) {
	if (status == 'enable') {
		$('#right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4').on('click', function () {
			$(this).toggleClass('active').parent().find('.block_content').stop().slideToggle('medium');
		})
		$('#right_column, #left_column').addClass('accordion').find('.block:not(#layered_block_left) .block_content').slideUp('fast');
		if (typeof(ajaxCart) !== 'undefined')
			ajaxCart.collapse();
	} else {
		$('#right_column .block:not(#layered_block_left) .title_block, #left_column .block:not(#layered_block_left) .title_block, #left_column #newsletter_block_left h4').removeClass('active').off().parent().find('.block_content').removeAttr('style').slideDown('fast');
		$('#left_column, #right_column').removeClass('accordion');
	}
}




