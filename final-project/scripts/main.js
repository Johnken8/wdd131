/* -------------------------------- 
   Nigeria Unveiled - Main JavaScript
   This file contains all interactive functionality for the Nigeria Unveiled website.
   Features include:
   - Navigation menu toggle for mobile responsive design
   - Image gallery with modal functionality
   - Form validation and submission handling
   - Dynamic content loading and animations
   - Accessibility enhancements
-------------------------------- */

// Wait for DOM content to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Navigation Menu Toggle =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            menuToggle.classList.toggle('active');
            
            // Toggle ARIA expanded state for accessibility
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('show') && 
            !event.target.closest('.nav-menu') && 
            !event.target.closest('.menu-toggle')) {
            navMenu.classList.remove('show');
            if (menuToggle) {
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // ===== Image Gallery Modal Functionality =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    
    // Initialize gallery functionality if gallery elements exist
    if (galleryItems.length > 0) {
        // Create modal if it doesn't exist
        if (!modal) {
            createGalleryModal();
        }
        
        // Add click event listener to each gallery item
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                openGalleryModal(this);
            });
            
            // Add keyboard accessibility
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openGalleryModal(this);
                }
            });
            
            // Make gallery items focusable for accessibility
            if (!item.getAttribute('tabindex')) {
                item.setAttribute('tabindex', '0');
            }
        });
    }
    
    // Create the gallery modal dynamically
    function createGalleryModal() {
        const modalElement = document.createElement('div');
        modalElement.id = 'imageModal';
        modalElement.className = 'modal';
        modalElement.setAttribute('aria-hidden', 'true');
        modalElement.setAttribute('role', 'dialog');
        modalElement.setAttribute('aria-label', 'Image Gallery Modal');
        
        modalElement.innerHTML = `
            <div class="modal-content">
                <span class="close-button" aria-label="Close modal">&times;</span>
                <div class="modal-image-container">
                    <img src="" alt="" class="modal-image">
                </div>
                <div class="modal-caption"></div>
                <div class="modal-navigation">
                    <button class="nav-button prev" aria-label="Previous image">&lt;</button>
                    <button class="nav-button next" aria-label="Next image">&gt;</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modalElement);
        
        // Add event listeners to the newly created modal
        const closeButton = modalElement.querySelector('.close-button');
        const prevButton = modalElement.querySelector('.nav-button.prev');
        const nextButton = modalElement.querySelector('.nav-button.next');
        
        closeButton.addEventListener('click', closeGalleryModal);
        prevButton.addEventListener('click', navigateGallery.bind(null, 'prev'));
        nextButton.addEventListener('click', navigateGallery.bind(null, 'next'));
        
        // Close modal on outside click
        modalElement.addEventListener('click', function(event) {
            if (event.target === modalElement) {
                closeGalleryModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalElement.classList.contains('show')) {
                closeGalleryModal();
            } else if (e.key === 'ArrowLeft' && modalElement.classList.contains('show')) {
                navigateGallery('prev');
            } else if (e.key === 'ArrowRight' && modalElement.classList.contains('show')) {
                navigateGallery('next');
            }
        });
    }
    
    // Track current gallery index for navigation
    let currentGalleryIndex = 0;
    
    // Open the gallery modal with a specific item
    function openGalleryModal(galleryItem) {
        const modal = document.getElementById('imageModal');
        const modalImage = modal.querySelector('.modal-image');
        const modalCaption = modal.querySelector('.modal-caption');
        
        // Get image source and caption information
        const imageElement = galleryItem.querySelector('img');
        const captionElement = galleryItem.querySelector('figcaption');
        
        if (imageElement) {
            // Set larger image source - in a real implementation, would use a high-res version
            modalImage.src = imageElement.src;
            modalImage.alt = imageElement.alt;
            
            // Set caption if available
            if (captionElement) {
                modalCaption.textContent = captionElement.textContent;
            } else {
                modalCaption.textContent = '';
            }
            
            // Calculate current index for navigation
            const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
            currentGalleryIndex = galleryItems.indexOf(galleryItem);
            
            // Show modal
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            
            // Focus on modal for accessibility
            modalImage.focus();
            
            // Prevent body scrolling while modal is open
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Close the gallery modal
    function closeGalleryModal() {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            
            // Restore body scrolling
            document.body.style.overflow = '';
            
            // Return focus to the gallery item that was clicked
            const galleryItems = document.querySelectorAll('.gallery-item');
            if (galleryItems[currentGalleryIndex]) {
                galleryItems[currentGalleryIndex].focus();
            }
        }
    }
    
    // Navigate between gallery images
    function navigateGallery(direction) {
        const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        
        if (direction === 'prev') {
            currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        } else {
            currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        }
        
        openGalleryModal(galleryItems[currentGalleryIndex]);
    }
    
    // ===== Contact Form Validation and Submission =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Reset previous error messages
            const errorElements = document.querySelectorAll('.error-message');
            errorElements.forEach(element => {
                element.textContent = '';
                element.classList.remove('show-error');
            });
            
            // Validate form data
            let isValid = true;
            
            // Name validation
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Email validation
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Subject validation
            if (!subjectInput.value.trim()) {
                showError(subjectInput, 'Please enter a subject');
                isValid = false;
            }
            
            // Message validation
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Please enter your message');
                isValid = false;
            } else if (messageInput.value.trim().length < 20) {
                showError(messageInput, 'Your message should be at least 20 characters');
                isValid = false;
            }
            
            // If form is valid, process submission
            if (isValid) {
                // In a real implementation, this would connect to a backend service
                // For the demonstration, we'll simulate a successful submission
                
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalButtonText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission with a delay
                setTimeout(function() {
                    // Clear form
                    contactForm.reset();
                    
                    // Show success message
                    const formContainer = contactForm.closest('.form-container');
                    const successMessage = document.createElement('div');
                    successMessage.className = 'success-message';
                    successMessage.innerHTML = `
                        <h3>Thank you for your message!</h3>
                        <p>We have received your inquiry and will respond shortly.</p>
                        <button class="btn send-new-message">Send another message</button>
                    `;
                    
                    formContainer.innerHTML = '';
                    formContainer.appendChild(successMessage);
                    
                    // Add event listener to "Send another message" button
                    const newMessageButton = formContainer.querySelector('.send-new-message');
                    if (newMessageButton) {
                        newMessageButton.addEventListener('click', function() {
                            formContainer.innerHTML = '';
                            formContainer.appendChild(contactForm);
                            submitButton.textContent = originalButtonText;
                            submitButton.disabled = false;
                        });
                    }
                }, 1500);
            }
        });
        
        // Add input event listeners for real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                // Clear error message when user starts typing
                const errorElement = document.getElementById(`${input.id}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.classList.remove('show-error');
                }
            });
        });
    }
    
    // Helper function to display form errors
    function showError(inputElement, message) {
        // Check if error element already exists
        let errorElement = document.getElementById(`${inputElement.id}-error`);
        
        // Create error element if it doesn't exist
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.id = `${inputElement.id}-error`;
            errorElement.className = 'error-message';
            inputElement.parentNode.appendChild(errorElement);
        }
        
        // Set error message and show it
        errorElement.textContent = message;
        errorElement.classList.add('show-error');
        
        // Add error styling to input
        inputElement.classList.add('input-error');
        
        // Remove error styling when input is focused
        inputElement.addEventListener('focus', function() {
            this.classList.remove('input-error');
        }, { once: true });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    // ===== Reference Page Citation Highlighting =====
    const referenceList = document.querySelectorAll('.reference-list li');
    
    if (referenceList.length > 0) {
        referenceList.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.classList.add('highlight');
            });
            
            item.addEventListener('mouseleave', function() {
                this.classList.remove('highlight');
            });
        });
    }
    
    // ===== Smooth Scrolling for Anchor Links =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
    
    // ===== Add Active Class to Current Page in Navigation =====
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkPath = link.getAttribute('href');
            if (currentPath.endsWith(linkPath) || 
                (currentPath.endsWith('/') && linkPath === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    
    // ===== Lazy Loading Images =====
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-image');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Load all images immediately
        const lazyImages = document.querySelectorAll('.lazy-image');
        lazyImages.forEach(function(img) {
            img.src = img.dataset.src;
            img.classList.remove('lazy-image');
        });
    }
    
    // ===== Back to Top Button =====
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        // Show button when user scrolls down
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});