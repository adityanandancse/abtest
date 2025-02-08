// Enhanced SEO tracking and optimization
document.addEventListener('DOMContentLoaded', function() {
    // Track user interactions
    trackUserInteractions();
    // Add dynamic structured data
    addStructuredData();
    // Optimize images
    optimizeImages();
    // Track core web vitals
    trackWebVitals();
});

function trackUserInteractions() {
    // Track outbound links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            gtag('event', 'click', {
                'event_category': 'Outbound Link',
                'event_label': this.href,
                'transport_type': 'beacon'
            });
        });
    });

    // Track product views
    document.querySelectorAll('.quick-view-item').forEach(item => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    gtag('event', 'view_item', {
                        'event_category': 'Product',
                        'event_label': item.querySelector('.quick-view-title').textContent
                    });
                    observer.unobserve(item);
                }
            });
        });
        observer.observe(item);
    });

    // Enhanced scroll depth tracking
    let scrollDepth = 0;
    const scrollPoints = [25, 50, 75, 90, 100];
    
    window.addEventListener('scroll', debounce(function() {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollPos = window.scrollY + winHeight;
        const scrollPercentage = Math.round((scrollPos / docHeight) * 100);

        scrollPoints.forEach(point => {
            if (scrollPercentage >= point && scrollDepth < point) {
                scrollDepth = point;
                gtag('event', 'scroll_milestone', {
                    'event_category': 'Scroll Depth',
                    'event_label': `${point}%`,
                    'non_interaction': true
                });
            }
        });
    }, 250));
}

function addStructuredData() {
    const websiteData = {
        "@context": "https://schema.org",
        "@type": "FashionBrand",
        "name": "Achin Bindlish",
        "url": "https://achinbindlish.com",
        "logo": "https://achinbindlish.com/images/Logos/Logo/ACHIN BINDLISH.png",
        "description": "Luxury fashion designer specializing in bridal wear and custom designer outfits",
        "priceRange": "₹₹₹",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Defence Colony",
            "addressLocality": "New Delhi",
            "addressCountry": "IN"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Fashion Collections",
            "itemListElement": getProductData()
        }
    };

    injectStructuredData(websiteData);
}

function getProductData() {
    const products = document.querySelectorAll('.quick-view-item');
    return Array.from(products).map(product => ({
        "@type": "Product",
        "name": product.querySelector('.quick-view-title').textContent,
        "category": product.querySelector('.quick-view-category').textContent,
        "image": product.querySelector('img').src,
        "url": product.querySelector('a').href
    }));
}

function optimizeImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        // Add srcset for responsive images
        if (!img.srcset && img.src) {
            const srcBase = img.src.replace(/\.\w+$/, '');
            img.srcset = `${srcBase}-300w.webp 300w, ${srcBase}-600w.webp 600w, ${srcBase}-900w.webp 900w`;
            img.sizes = '(max-width: 768px) 100vw, 50vw';
        }
    });
}

function trackWebVitals() {
    // Track Core Web Vitals
    if ('web-vital' in window) {
        webVitals.getCLS(sendToGoogleAnalytics);
        webVitals.getFID(sendToGoogleAnalytics);
        webVitals.getLCP(sendToGoogleAnalytics);
    }
}

function sendToGoogleAnalytics({name, delta, id}) {
    gtag('event', name, {
        'event_category': 'Web Vitals',
        'event_label': id,
        'value': Math.round(delta),
        'non_interaction': true
    });
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function injectStructuredData(data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
} 