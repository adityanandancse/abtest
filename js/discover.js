// Navigation button functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('item-carousel-big');
    
    if (carousel) {
        jQuery(".d-arrow-left").on("click", function() {
            jQuery("#item-carousel-big").trigger('prev.owl.carousel');
        });

        jQuery(".d-arrow-right").on("click", function() {
            jQuery("#item-carousel-big").trigger('next.owl.carousel');
        });
    }
});

// Navigation functions
function prevSlide() {
    jQuery("#item-carousel-big").trigger('prev.owl.carousel');
}

function nextSlide() {
    jQuery("#item-carousel-big").trigger('next.owl.carousel');
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

$(document).ready(function() {
    // Initialize Owl Carousel
    $("#item-carousel-big").owlCarousel({
        center: true,
        items: 3,
        loop: true,
        margin: 20,
        nav: false,
        dots: false,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 1000,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

    // Custom Navigation
    $('.d-arrow-left').click(function() {
        $("#item-carousel-big").trigger('prev.owl.carousel');
    });

    $('.d-arrow-right').click(function() {
        $("#item-carousel-big").trigger('next.owl.carousel');
    });

    // Add animation class to items
    $('.c-item').addClass('wow fadeInUp');

    // Pause autoplay on hover
    $('.d-carousel').hover(
        function() {
            $("#item-carousel-big").trigger('stop.owl.autoplay');
        },
        function() {
            $("#item-carousel-big").trigger('play.owl.autoplay');
        }
    );
});
