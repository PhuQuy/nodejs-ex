
$(document).ready(function(){
	if (typeof(jqZoomEnabled) != 'undefined' && jqZoomEnabled) {
		if ($('#thumbs_list .shown img').length) {
			var new_src = $('#thumbs_list .shown img').attr('src').replace('cart_', 'large_');
			if ($('.jqzoom img').attr('src') != new_src)
				$('.jqzoom img').attr('src', new_src).parent().attr('href', new_src);
		}
		$('.jqzoom').jqzoom({
			zoomType: 'innerzoom',
			zoomWidth: 458,
			zoomHeight: 458,
			xOffset: 21,
			yOffset: 0,
			title: false
		});
	}
	
	if (productColumns != 'undefined') {
		if ($(document).width() >= 768) {
			if (productColumns == 1) {
				minSlides = 6
			} else if (productColumns == 2) {
				minSlides = 5
			} else {
				minSlides = 3
			}
			maxSlides = 6;
		} else {
			minSlides = 3;
			maxSlides = 3;
		}
	} else {
		minSlides = 2
	}
	if ($('#bxslider li').length && !!$.prototype.bxSlider)
		slider2 = $('#bxslider').bxSlider({
			minSlides: minSlides,
			maxSlides: maxSlides,
			slideWidth: 178,
			slideMargin: 20,
			pager: false,
			nextText: '',
			prevText: '',
			moveSlides: 1,
			infiniteLoop: false,
			hideControlOnEnd: true
		});
	if ($('#bxslider').length) {
		$(window).resize(function () {
			if ($(document).width() <= 767) {
				slider2.reloadSlider({
					minSlides: 3,
					maxSlides: 3,
					slideWidth: 178,
					slideMargin: 20,
					pager: false,
					nextText: '',
					prevText: '',
					moveSlides: 1,
					infiniteLoop: false,
					hideControlOnEnd: true
				})
			}
			else if ($(document).width() >= 768) {
				if (productColumns != 'undefined') {
					if (productColumns == 1) {
						minSlides = 6
					} else if (productColumns == 2) {
						minSlides = 5
					} else {
						minSlides = 3
					}
				} else {
					minSlides = 2
				}
				slider2.reloadSlider({
					minSlides: minSlides,
					maxSlides: 6,
					slideWidth: 178,
					slideMargin: 20,
					pager: false,
					nextText: '',
					prevText: '',
					moveSlides: 1,
					infiniteLoop: false,
					hideControlOnEnd: true
				})
			}
		})
	}
	if (!$('#bxslider li').length)
		$('.accessories-block').parent().remove();
});
