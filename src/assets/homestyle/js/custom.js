
(function ($) {
	
    'use strict';
//=======================================================//    
//________document.ready (ALL FUNCTION)________//
//=======================================================//


   /* =======================================
         Slider  Carousel
    ======================================*/	
    
     jQuery(".slider_home").owlCarousel({
        items: 1,
        autoplay: false,
        loop: true,
        autoplayTimeout: 8000, // Default is 5000
        smartSpeed: 1000, // Default is 250
        navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		dots: true,
        nav: false,
        mouseDrag: true,
        touchDrag: true
    });

    jQuery(".slider_home").on("translate.owl.carousel", function() {
        jQuery(".slide-text-grid,.single_slider h2, .single_slider p").removeClass("animated fadeInUp").css("opacity", "0");
    });

    jQuery(".slider_home").on("translated.owl.carousel", function() {
        jQuery(".slide-text-grid,.single_slider h2, .single_slider p").addClass("animated fadeInUp").css("opacity", "1");
    });

	//________COUNTERUP FUNCTION BY= counterup-min.js________//

	jQuery('.counter').counterUp({
		delay: 10,
		time: 1000
	});
	
	
	
//________TOOLTIP FUNCTION BY=bootstrap.js________//

	jQuery('[data-toggle="tooltip"]').tooltip();
	
	
	

//________POPOVER FUNCTION BY =bootstrap.js________//

	jQuery('[data-toggle="popover"]').popover();

	


		
//________STICKY MENU WHEN SCROLL DOWN________//	

function sticky_header(){
	if(jQuery('.sticky-header').length){
		var sticky = new Waypoint.Sticky({
		  element: jQuery('.sticky-header')
		})
	}
}
	



//________SCROLL TOP BUTTON________//	

function scroll_top(){
	jQuery("button.scroltop").on('click', function() {
		jQuery("html, body").animate({
			scrollTop: 0
		}, 1000);
		return false;
	});

	jQuery(window).on("scroll", function() {
		var scroll = jQuery(window).scrollTop();
		if (scroll > 900) {
			jQuery("button.scroltop").fadeIn(1000);
		} else {
			jQuery("button.scroltop").fadeOut(1000);
		}
	});
}
	
	

	
	

//________FOOTER FIXED ON BOTTOM PART________//	

function footer_fixed() {
	jQuery('.site-footer').css('display', 'block');
	jQuery('.site-footer').css('height', 'auto');
	var footerHeight = jQuery('.site-footer').outerHeight();
	jQuery('.footer-fixed > .page-wraper').css('padding-bottom', footerHeight);
	jQuery('.site-footer').css('height', footerHeight);
}
	
	 
	 

//________NAVIGATION SUBMENU SHOW & HIDE ON MOBILE________//	

function mobile_nav(){
	jQuery(".sub-menu").parent('li').addClass('has-child');
	jQuery(".mega-menu").parent('li').addClass('has-child');
	jQuery("<div class=' glyphicon glyphicon-plus submenu-toogle'></div>").insertAfter(".has-child > a");
	jQuery('.has-child a+.submenu-toogle').on('click', function(ev) {
		jQuery(this).next(jQuery('.sub-menu')).slideToggle('fast', function(){
			jQuery(this).parent().toggleClass('nav-active');
		});
		ev.stopPropagation();
	});
}
	 	
	
	
	
//________INDEX PAGE CAROUSEL 1 FUNCTION BY = owl.carousel.js________//

function home_carousel_1(){
	jQuery('.home-carousel-1').owlCarousel({
		loop:true,
		margin:30,
		nav:false,
		dots: true,
		autoplay:true,
	    autoplayTimeout:5000,
	    autoplayHoverPause:false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive:{
			0:{
				items:1
			},
			480:{
				items:1
			},			
			
			767:{
				items:1,
				margin:50
			},
			1000:{
				items:2
			}
		}
		
	});	
	
}	

//________CLIENT LOGO ON HOME PAGE FUNCTION BY= owl.carousel.js________//

function home_client_logo(){
	jQuery('.home-client-logo').owlCarousel({
		loop:true,
		autoplay:true,
		autoplayTimeout:4000,
		margin:20,
		nav:false,
		dots: false,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		responsive:{
			0:{
				items:2
			},
			480:{
				items:2
			},			
			
			767:{
				items:3
			},
			1000:{
				items:5
			}
		}
		
	});
}
	
	
		
		/* Filter Nav */

	jQuery('.btn-filter-wrap2').on('click', '.btn-filter', function(e) {
		var filter_data = jQuery(this).data('filter');

		/* return if current */
		if(jQuery(this).hasClass('btn-active')) return;

		/* active current */
		jQuery(this).addClass('btn-active').siblings().removeClass('btn-active');

		/* Filter */
		owl.owlFilter(filter_data, function(_owl) { 
			jQuery(_owl).find('.item').each(owlAnimateFilter); 
		});
	})
		
	
	
	
	
			
//=======================================================//    
//________Window on load (ALL FUNCTION)________//
//=======================================================//	


// text animation function

var TxtType = function(el, toRotate, period) {
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

TxtType.prototype.tick = function() {
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if (this.isDeleting) {
	this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
	this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
	delta = this.period;
	this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
	this.isDeleting = false;
	this.loopNum++;
	delta = 500;
	}

	setTimeout(function() {
	that.tick();
	}, delta);
};

window.onload = function() {
	var elements = document.getElementsByClassName('typewrite');
	for (var i=0; i<elements.length; i++) {
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if (toRotate) {
		  new TxtType(elements[i], JSON.parse(toRotate), period);
		}
	}
	// INJECT CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap {}";
	document.body.appendChild(css);
};




//________ON SCROLL CONTENT ANIMATED FUNCTION BY= Viewportchecker.js________//

function animate_content(){
	jQuery('.animate').scrolla({
		mobile: false,
		once: true
	});
}




//________SKILLS BAR ________//

/* 2.1 skills bar tooltips*/
function progress_bar_tooltips() {
	jQuery(function () { 
	  jQuery('[data-toggle="tooltips"]').tooltip({trigger: 'manual'}).tooltip('show');
	});  
}

/* 2.2 skills bar widths*/

function progress_bar_width() {	
	jQuery( window ).on('scroll', function() {   
	  jQuery(".progress-bar").each(function(){
		progress_bar_width = jQuery(this).attr('aria-valuenow');
		jQuery(this).width(progress_bar_width + '%');
	  });
	}); 
}

		
	

//________PARALLAX EFFECT ON BACKGROUND IMAGE FUNCTION BY = stellar.js ________// 

function bg_image_stellar(){
	jQuery(function(){
			jQuery.stellar({
				horizontalScrolling: false,
				verticalOffset:100
			});
		});
}
	
			

//________PAGE LOADER________// 	

function page_loader() {
		jQuery('.loading-area').fadeOut(1000)
};
	

function slides_loader() {
		//slides preload
		$(".slides__preload_wrapper").fadeOut(1500);
};
	
	
	

//=======================================================//    
//________Window on SCROLL (ALL FUNCTION)________//
//=======================================================//	

function color_fill_header() {
        var scroll = jQuery(window).scrollTop();
        if(scroll >= 100) {
            jQuery(".is-fixed").addClass("color-fill");
        } else {
            jQuery(".is-fixed").removeClass("color-fill");
        }
};
	
	

/*--------------------------------------------------------------------------------------------
	document.ready ALL FUNCTION START
---------------------------------------------------------------------------------------------*/
jQuery(document).ready(function() {

		$(".nav-tabs li a").click(function(){
		      $(".nav-tabs li").removeClass("active");
		      $(this).parent().addClass("active");
        });
 	
		//________STICKY MENU WHEN SCROLL DOWN________//	
		sticky_header(),

		scroll_top(),
		//________FOOTER FIXED ON BOTTOM PART________//	
		footer_fixed(), 
		//____NAVIGATION SUBMENU SHOW & HIDE ON MOBILE________//	
		mobile_nav(),
		//________INDEX PAGE CAROUSEL 1 FUNCTION BY = owl.carousel.js________//
		home_carousel_1(),
		//________CLIENT LOGO ON HOME PAGE FUNCTION BY= owl.carousel.js________//
		home_client_logo()       
}); 
	
	
	

/*--------------------------------------------------------------------------------------------
	Window Load START
---------------------------------------------------------------------------------------------*/
jQuery(window).on('load', function () {
				
		//________ON SCROLL CONTENT ANIMATED FUNCTION BY= Viewportchecker.js________//
		animate_content(),
		//________SKILLS BAR ________//
		progress_bar_tooltips(), 
		progress_bar_width(),
		//________PARALLAX EFFECT ON BACKGROUND IMAGE FUNCTION BY = stellar.js ________// 
		bg_image_stellar(),
		//________PAGE LOADER________// 	
		page_loader(),

		slides_loader()		
		
});




 /*===========================
	Window Scroll ALL FUNCTION START
===========================*/

jQuery(window).on('scroll', function () {
		// > Window on scroll header color fill 
		color_fill_header()
});
	
/*===========================
	Window Resize ALL FUNCTION START
===========================*/

jQuery(window).on('resize', function () {
		//________FOOTER FIXED ON BOTTOM PART________//		 
		footer_fixed();
});

})(window.jQuery);