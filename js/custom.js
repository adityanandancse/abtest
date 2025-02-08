(function($) {
    "use strict";
	
		/* --[ Preloader ]-- */
		$(window).on('load',function() {
			$('.loader').fadeOut();
			$('.page-loader').delay(350).fadeOut('slow');
		});
		
		/* --[ Menu Sticky ]-- */
		$(window).on('scroll',function() {    
			var scroll = $(window).scrollTop();
			if (scroll < 245) { 
				$(".sticker").removeClass("stick");
			}else{
				$(".sticker").addClass("stick");
			}
		}); 
		
		/* --[ mobile menu active ]-- */
       $('#mobile-nav').meanmenu();		
		
		/* --[ Initialization General Scripts for all pages ]-- */
		var moduleHero = $('.module-hero'),
			module     = $('.module-hero, .module, .module-small'),
			navbar     = $('.navbar-custom'),
			navHeight  = navbar.height(),
			worksgrid  = $('#works-grid'),
			width      = Math.max($(window).width(), window.innerWidth),
			mobileTest;
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobileTest = true;
		}
		buildModuleHero(moduleHero);

		/* --[ Set module backgrounds ]-- */
		module.each(function(i) {
			if ($(this).attr('data-background')) {
				$(this).css('background-image', 'url(' + $(this).attr('data-background') + ')');
			}
		});

		/* --[ Full height module ]-- */
		function buildModuleHero(moduleHero) {
			if (moduleHero.length > 0) {
				if (moduleHero.hasClass('module-full-height')) {
					moduleHero.height($(window).height());
				} else {
					moduleHero.height($(window).height() * 0.85);
				}
			}
		};

		/* --[ Hero slider setup ]-- */
		if ($('.hero-slider').length > 0) {
			$('.hero-slider').flexslider({
				animation: 'fade',
				animationSpeed: 1000,
				animationLoop: true,
				prevText: '',
				nextText: '',
				start: function(slider) {
					heroSliderLight();
				},
				before: function(slider) {
					if(mobileTest != true) {
						$('.hs-caption').fadeOut().animate({top:'-80px'},{queue:false, easing: 'swing', duration: 700});
						slider.slides.eq(slider.currentSlide).delay(500);
						slider.slides.eq(slider.animatingTo).delay(500);
					}
				},
				after: function(slider) {
					heroSliderLight();
					if(mobileTest != true) {
						$('.hs-caption').fadeIn().animate({top:'0'},{queue:false, easing: 'swing', duration: 700});
					}
				},
				useCSS: true
			});
		};

		/* --[  Change color on light slide ]-- */
		function heroSliderLight() {
			if ($('li.bg-light').hasClass('flex-active-slide')) {
				navbar.addClass('nabar-dark');
				$('.hero-slider').addClass('hero-slider-dark');
			} else {
				navbar.removeClass('nabar-dark');
				$('.hero-slider').removeClass('hero-slider-dark');
			}
		}

		/* --[  Hero slider pause on scroll ]-- */
		if ($('.hero-slider').length > 0) {
			$(window).on('scroll',function() {
				var st = $(window).scrollTop();
				if (st > 0) {
					$('.hero-slider').flexslider('pause');
				}
			});
		}

		/* --[  Youtube video background ]-- */
		if(mobileTest != true) {
			$(function() {
				$(".video-player").mb_YTPlayer();
			});

			$('.video-controls-box a').css('visibility', 'visible');

			$('#video-play').on('click', function(event) {
				event.preventDefault();
				if ($(this).hasClass('fa-play')) {
					$('.video-player').playYTP();
				} else {
					$('.video-player').pauseYTP();
				}
				$(this).toggleClass('fa-play fa-pause');
				return false;
			});

			$('#video-volume').on('click', function(event) {
				event.preventDefault();
				$('.video-player').toggleVolume();
				$(this).toggleClass('fa-volume-off fa-volume-up');
				return false;
			});
		}

		/* --[  Portfolio ]-- */
		var worksgrid_mode;
		if (worksgrid.hasClass('works-grid-masonry')) {
			worksgrid_mode = 'masonry';
		} else {
			worksgrid_mode = 'fitRows';
		}
		worksgrid.imagesLoaded(function() {
			worksgrid.isotope({
				layoutMode: worksgrid_mode,
				itemSelector: '.work-item',
			});
		});
		$('#filters a').on('click',function() {
			$('#filters .current').removeClass('current');
			$(this).addClass('current');
			var selector = $(this).attr('data-filter');
			worksgrid.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});

			return false;
		});

		/* --[  Post slider  ]-- */
		$('.post-images-slider').flexslider( {
			animation: 'slide',
			smoothHeight: true,
		});

		/* --[  Progress bars, counters animations ]-- */
		$('.progress-bar').each(function(i) {
			$(this).appear(function() {
				var percent = $(this).attr('aria-valuenow');
				$(this).animate({'width' : percent + '%'});
				$(this).find('span').animate({'opacity' : 1}, 900);
				$(this).find('span').countTo({from: 0, to: percent, speed: 900, refreshInterval: 30});
			});
		});
		
		/* --[  counter item ]-- */		
		$('.counter-item').each(function(i) {
			$(this).appear(function() {
				var number = $(this).find('.counter-number').data('number');
				$(this).find('.counter-number span').countTo({from: 0, to: number, speed: 1200, refreshInterval: 30});
			});
		});

		/* --[  Popup images ]-- */		
		$('a.popup').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0,1]
			},
			image: {
				titleSrc: 'title',
				tError: 'The image could not be loaded.',
			}
		});

		/* --[ Rotate Text ]-- */
		$(".rotate").textrotator({
			animation: "dissolve",
			separator: "|",
			speed: 3000
		});

		/* --[ A jQuery plugin for fluid width video embeds ]-- */
		$('body').fitVids();
		
		/* --[ Scroll Animation ]-- */
		$('.section-scroll').bind('click', function(e) {
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top
			}, 1000);
			e.preventDefault();
		});

		/* --[  Scroll top ]-- */
		$(window).on('scroll',function() {
			if ($(this).scrollTop() > 100) {
				$('.scroll-up').fadeIn();
			} else {
				$('.scroll-up').fadeOut();
			}
		});
		$('a[href="#totop"]').on('click', function() {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
			return false;
		});

		
        // Contact Form Start
        // Contact Form Message Popup 
        function contactFormPopup() {
            var trigger = $('#contact-form [type="submit"]'),
                container = $('.cr-contact-message-modal');
        
            trigger.on('click', function () {
                container.addClass('is-visible');
            });
        
            $('<button><i class="fa fa-window-close-o"></i></button>').appendTo(container).on('click', function () {
                container.removeClass('is-visible');
            });
        }
        contactFormPopup();
       // Contact Form End

       // Discover Carousel
       document.addEventListener('DOMContentLoaded', function() {
           const track = document.querySelector('.discover-track');
           const items = document.querySelectorAll('.discover-item');
           const prevBtn = document.querySelector('.prev-btn');
           const nextBtn = document.querySelector('.next-btn');
           
           // Clone items for infinite scroll
           items.forEach(item => {
               const clone = item.cloneNode(true);
               track.appendChild(clone);
           });

           let currentPosition = 0;
           const itemWidth = items[0].offsetWidth + 20; // Include margin
           let isTransitioning = false;

           function moveCarousel(direction) {
               if (isTransitioning) return;
               isTransitioning = true;

               const moveAmount = direction === 'next' ? -itemWidth : itemWidth;
               currentPosition += moveAmount;

               track.style.transform = `translateX(${currentPosition}px)`;
               track.style.transition = 'transform 0.5s ease';

               // Reset position for infinite scroll
               setTimeout(() => {
                   if (Math.abs(currentPosition) >= (items.length * itemWidth)) {
                       currentPosition = 0;
                       track.style.transition = 'none';
                       track.style.transform = `translateX(${currentPosition}px)`;
                   }
                   isTransitioning = false;
               }, 500);
           }

           // Auto scroll
           let autoScroll = setInterval(() => moveCarousel('next'), 3000);

           // Event listeners
           prevBtn.addEventListener('click', () => {
               clearInterval(autoScroll);
               moveCarousel('prev');
               autoScroll = setInterval(() => moveCarousel('next'), 3000);
           });

           nextBtn.addEventListener('click', () => {
               clearInterval(autoScroll);
               moveCarousel('next');
               autoScroll = setInterval(() => moveCarousel('next'), 3000);
           });

           // Pause on hover
           track.addEventListener('mouseenter', () => clearInterval(autoScroll));
           track.addEventListener('mouseleave', () => {
               autoScroll = setInterval(() => moveCarousel('next'), 3000);
           });
       });

       // Gallery Slider
       document.addEventListener('DOMContentLoaded', function() {
           const container = document.querySelector('.carousel-container');
           const track = document.querySelector('.carousel-track');
           const items = document.querySelectorAll('.carousel-item');
           const prevBtn = document.querySelector('.carousel-nav.prev');
           const nextBtn = document.querySelector('.carousel-nav.next');
           const previewNext = document.querySelector('.preview-next img');
           const previewPrev = document.querySelector('.preview-prev img');
           
           let currentIndex = 0;
           let startX = 0;
           let currentX = 0;
           let isDragging = false;
           
           // Update preview images
           function updatePreviews() {
               const nextIndex = (currentIndex + 1) % items.length;
               const prevIndex = (currentIndex - 1 + items.length) % items.length;
               
               previewNext.src = items[nextIndex].querySelector('img').src;
               previewPrev.src = items[prevIndex].querySelector('img').src;
           }
           
           // Touch events
           container.addEventListener('touchstart', (e) => {
               startX = e.touches[0].clientX;
               isDragging = true;
               track.style.transition = 'none';
           });
           
           container.addEventListener('touchmove', (e) => {
               if (!isDragging) return;
               
               currentX = e.touches[0].clientX;
               const diff = currentX - startX;
               const movePercent = (diff / container.offsetWidth) * 100;
               
               track.style.transform = `translateX(${-currentIndex * 100 + movePercent}%)`;
           });
           
           container.addEventListener('touchend', (e) => {
               isDragging = false;
               track.style.transition = 'transform 0.5s ease-in-out';
               
               const diff = currentX - startX;
               const threshold = container.offsetWidth * 0.2;
               
               if (Math.abs(diff) > threshold) {
                   if (diff > 0) {
                       slidePrev();
                   } else {
                       slideNext();
                   }
               } else {
                   track.style.transform = `translateX(-${currentIndex * 100}%)`;
               }
           });
           
           function slideNext() {
               currentIndex = (currentIndex + 1) % items.length;
               track.style.transform = `translateX(-${currentIndex * 100}%)`;
               updatePreviews();
           }
           
           function slidePrev() {
               currentIndex = (currentIndex - 1 + items.length) % items.length;
               track.style.transform = `translateX(-${currentIndex * 100}%)`;
               updatePreviews();
           }
           
           // Initialize previews
           updatePreviews();
           
           // Event Listeners
           nextBtn.addEventListener('click', slideNext);
           prevBtn.addEventListener('click', slidePrev);
           
           // Auto slide
           let autoSlide = setInterval(slideNext, 5000);
           
           // Pause on hover
           container.addEventListener('mouseenter', () => {
               clearInterval(autoSlide);
           });
           
           container.addEventListener('mouseleave', () => {
               autoSlide = setInterval(slideNext, 5000);
           });
       });

       // Discover Grid
       document.addEventListener('DOMContentLoaded', function() {
           const grid = document.querySelector('.discover-grid');
           const items = document.querySelectorAll('.discover-item');
           const prevBtn = document.querySelector('.discover-nav.prev');
           const nextBtn = document.querySelector('.discover-nav.next');
           
           // Clone items for infinite scroll
           const totalItems = items.length;
           const itemsToClone = Math.ceil(totalItems / 2);
           
           // Clone items at both ends
           for (let i = 0; i < itemsToClone; i++) {
               // Clone end items to start
               const endClone = items[totalItems - 1 - i].cloneNode(true);
               grid.insertBefore(endClone, grid.firstChild);
               
               // Clone start items to end
               const startClone = items[i].cloneNode(true);
               grid.appendChild(startClone);
           }
           
           let currentIndex = itemsToClone;
           const itemWidth = items[0].offsetWidth + 20; // Including margin
           let isTransitioning = false;
           
           // Set initial position
           grid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
           
           function moveGrid(direction) {
               if (isTransitioning) return;
               isTransitioning = true;
               
               if (direction === 'next') {
                   currentIndex++;
               } else {
                   currentIndex--;
               }
               
               grid.style.transition = 'transform 0.5s ease-in-out';
               grid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
               
               // Reset position for infinite scroll
               setTimeout(() => {
                   if (currentIndex >= totalItems + itemsToClone) {
                       grid.style.transition = 'none';
                       currentIndex = itemsToClone;
                       grid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                   } else if (currentIndex < itemsToClone) {
                       grid.style.transition = 'none';
                       currentIndex = totalItems + itemsToClone - 1;
                       grid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
                   }
                   isTransitioning = false;
               }, 500);
           }
           
           // Auto scroll
           let autoScroll = setInterval(() => moveGrid('next'), 4000);
           
           // Navigation buttons
           prevBtn.addEventListener('click', () => {
               clearInterval(autoScroll);
               moveGrid('prev');
               autoScroll = setInterval(() => moveGrid('next'), 4000);
           });
           
           nextBtn.addEventListener('click', () => {
               clearInterval(autoScroll);
               moveGrid('next');
               autoScroll = setInterval(() => moveGrid('next'), 4000);
           });
           
           // Pause on hover
           grid.addEventListener('mouseenter', () => clearInterval(autoScroll));
           grid.addEventListener('mouseleave', () => {
               autoScroll = setInterval(() => moveGrid('next'), 4000);
           });
           
           // Handle window resize
           window.addEventListener('resize', () => {
               const newItemWidth = items[0].offsetWidth + 20;
               if (newItemWidth !== itemWidth) {
                   grid.style.transform = `translateX(-${currentIndex * newItemWidth}px)`;
               }
           });
       });

       // Slider initialization
       $('.home-slider').flexslider({
           animation: "fade",
           slideshow: true,
           slideshowSpeed: 6000,
           animationSpeed: 800,
           controlNav: true,
           directionNav: true,
           controlsContainer: ".flex-container",
           start: function(slider) {
               $('.home-slider').removeClass('loading');
           }
       });

       // Appointment Button Functionality
       function initAppointmentButtons() {
           const appointmentButtons = document.querySelectorAll('.appointment-button');
           
           appointmentButtons.forEach(button => {
               button.addEventListener('click', function() {
                   const phoneNumber = '918287222999';
                   const message = encodeURIComponent("Hello! I'd like to schedule an appointment.");
                   const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                   window.open(whatsappUrl, '_blank');
               });
           });
       }

       // Add lazy loading functionality
       function initLazyLoading() {
           const images = document.querySelectorAll('img[data-src]');
           
           const imageObserver = new IntersectionObserver((entries, observer) => {
               entries.forEach(entry => {
                   if (entry.isIntersecting) {
                       const img = entry.target;
                       img.src = img.dataset.src;
                       img.removeAttribute('data-src');
                       observer.unobserve(img);
                   }
               });
           });

           images.forEach(img => imageObserver.observe(img));
       }

       // Update carousel initialization
       function initCarousels() {
           if (typeof $.fn.owlCarousel !== 'undefined') {
               $('.insta-carousel').owlCarousel({
                   items: 1,
                   loop: true,
                   margin: 0,
                   nav: true,
                   dots: true,
                   autoplay: true,
                   autoplayTimeout: 5000,
                   autoplayHoverPause: true,
                   smartSpeed: 1000,
                   navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                   responsive: {
                       0: {
                           nav: false
                       },
                       768: {
                           nav: true
                       }
                   }
               });
           }
       }

       // Add performance optimizations
       document.addEventListener('DOMContentLoaded', function() {
           // Defer non-critical CSS
           const deferredStyles = document.querySelectorAll('link[data-defer]');
           deferredStyles.forEach(style => {
               style.setAttribute('media', 'print');
               style.addEventListener('load', () => {
                   style.setAttribute('media', 'all');
               });
           });

           // Initialize features
           initLazyLoading();
           initCarousels();
           initAppointmentButtons();
       });

       // Update Quick View initialization
       function initQuickView() {
           var $grid = $('#quick-view-items');
           
           if ($grid.length) {
               $grid.imagesLoaded(function() {
                   $grid.isotope({
                       itemSelector: '.quick-view-item',
                       layoutMode: 'fitRows',
                       fitRows: {
                           gutter: 30
                       }
                   });
               });

               // Update layout on window resize
               $(window).on('resize', function() {
                   $grid.isotope('layout');
               });

               // Smooth transition for images
               $('.quick-view-image img').on('load', function() {
                   $(this).addClass('loaded');
               });
           }
       }

       // Add to your DOMContentLoaded event
       document.addEventListener('DOMContentLoaded', function() {
           // ... other initializations ...
           initQuickView();
       });

})(jQuery);