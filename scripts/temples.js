// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerButton = document.getElementById('hamburger-menu');
    const mainNav = document.getElementById('main-nav');
    
    // Toggle navigation when hamburger is clicked
    hamburgerButton.addEventListener('click', function() {
        const isExpanded = mainNav.classList.contains('open');
        mainNav.classList.toggle('open');
        
        // Update aria-expanded state
        hamburgerButton.setAttribute('aria-expanded', !isExpanded);
        
        // Change hamburger to X when open
        if (mainNav.classList.contains('open')) {
            hamburgerButton.textContent = '❌';
            hamburgerButton.setAttribute('aria-label', 'Close menu');
        } else {
            hamburgerButton.textContent = '≡';
            hamburgerButton.setAttribute('aria-label', 'Open menu');
        }
    });
    
    // Copyright year
    const currentYearSpan = document.getElementById('currentYear');
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Last modified date
    const lastModifiedParagraph = document.getElementById('lastModified');
    lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('header') && mainNav.classList.contains('open')) {
            mainNav.classList.remove('open');
            hamburgerButton.textContent = '≡';
            hamburgerButton.setAttribute('aria-label', 'Open menu');
            hamburgerButton.setAttribute('aria-expanded', 'false');
        }
    });
});