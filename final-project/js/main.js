// Main JavaScript file for all pages

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const closeBanner = document.getElementById('close-banner');
const banner = document.getElementById('banner');
const themeButton = document.getElementById('theme-button');
const bannerMessage = document.getElementById('banner-message');

// Banner messages array
const bannerMessages = [
    'Explore the heart of Africa',
    'Discover Nigeria\'s rich culture',
    'Experience the beauty of Nigerian landmarks',
    'Immerse yourself in Nigerian heritage'
];

// Check for stored theme preference
document.addEventListener('DOMContentLoaded', () => {
    // Apply stored theme
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeButton) {
            themeButton.querySelector('.theme-icon').textContent = '☀️';
        }
    }

    // Check if banner was closed before
    const isBannerClosed = localStorage.getItem('bannerClosed');
    if (isBannerClosed === 'true' && banner) {
        banner.style.display = 'none';
    }

    // Set random banner message
    if (bannerMessage) {
        const randomIndex = Math.floor(Math.random() * bannerMessages.length);
        bannerMessage.textContent = bannerMessages[randomIndex];
    }

    // Initialize lazy loading for images
    initLazyLoading();
});

// Mobile menu toggle
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle menu icon (hamburger/close)
        const bars = menuToggle.querySelectorAll('.bar');
        bars[0].classList.toggle('rotate-45');
        bars[1].classList.toggle('opacity-0');
        bars[2].classList.toggle('rotate-negative-45');
    });
}

// Close banner and save preference
if (closeBanner && banner) {
    closeBanner.addEventListener('click', () => {
        banner.style.display = 'none';
        localStorage.setItem('bannerClosed', 'true');
    });
}

// Theme toggle functionality
if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        
        // Update theme icon
        const themeIcon = themeButton.querySelector('.theme-icon');
        themeIcon.textContent = isDarkTheme ? '☀️' : '🌙';
    });
}

// Lazy loading implementation
function initLazyLoading() {
    // Get all images that should be lazy loaded
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.loading = 'lazy';
            img.classList.add('loaded');
        });
    } else {
        // Fallback for browsers without native lazy loading support
        const lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
}