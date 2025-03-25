// Contact page functionality

// DOM Elements
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const interestInput = document.getElementById('interest');
const messageInput = document.getElementById('message');
const saveInfoCheckbox = document.getElementById('save-info');
const formSuccess = document.getElementById('form-success');
const savedDataContainer = document.getElementById('saved-data-container');
const noSavedData = document.getElementById('no-saved-data');
const savedName = document.getElementById('saved-name');
const savedEmail = document.getElementById('saved-email');
const savedInterest = document.getElementById('saved-interest');
const clearDataBtn = document.getElementById('clear-data');

// Initialize contact page
document.addEventListener('DOMContentLoaded', () => {
    // Load saved form data if exists
    loadSavedFormData();
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Clear saved data button
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', clearSavedData);
    }
});

// Form validation helper
function validateForm() {
    let isValid = true;
    
    // Reset previous error messages
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
    
    // Validate name
    if (!nameInput.value.trim()) {
        document.getElementById('name-error').textContent = 'Please enter your name';
        isValid = false;
    }
    
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        document.getElementById('email-error').textContent = 'Please enter your email address';
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // Validate interest
    if (!interestInput.value) {
        document.getElementById('interest-error').textContent = 'Please select an area of interest';
        isValid = false;
    }
    
    // Validate message
    if (!messageInput.value.trim()) {
        document.getElementById('message-error').textContent = 'Please enter your message';
        isValid = false;
    }
    
    return isValid;
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // If checkbox is checked, save form data to localStorage
    if (saveInfoCheckbox.checked) {
        saveFormData();
    }
    
    // Show success message
    contactForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
    
    // Reset form after 5 seconds and hide success message
    setTimeout(() => {
        contactForm.reset();
        formSuccess.classList.add('hidden');
        contactForm.classList.remove('hidden');
    }, 5000);
}

// Save form data to localStorage
function saveFormData() {
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        interest: interestInput.options[interestInput.selectedIndex].text
    };
    
    localStorage.setItem('contactFormData', JSON.stringify(formData));
    
    // Update saved info display
    displaySavedData(formData);
}

// Load saved form data from localStorage
function loadSavedFormData() {
    const savedData = localStorage.getItem('contactFormData');
    
    if (savedData) {
        const formData = JSON.parse(savedData);
        
        // Display saved data in the sidebar
        displaySavedData(formData);
        
        // Pre-fill form fields
        if (nameInput) nameInput.value = formData.name || '';
        if (emailInput) emailInput.value = formData.email || '';
        
        // Set interest dropdown
        if (interestInput && formData.interest) {
            for (let i = 0; i < interestInput.options.length; i++) {
                if (interestInput.options[i].text === formData.interest) {
                    interestInput.selectedIndex = i;
                    break;
                }
            }
        }
    }
}

// Display saved data in the sidebar
function displaySavedData(data) {
    if (!savedDataContainer || !noSavedData) return;
    
    if (data && (data.name || data.email || data.interest)) {
        savedName.textContent = data.name || 'Not provided';
        savedEmail.textContent = data.email || 'Not provided';
        savedInterest.textContent = data.interest || 'Not provided';
        
        savedDataContainer.classList.remove('hidden');
        noSavedData.classList.add('hidden');
    } else {
        savedDataContainer.classList.add('hidden');
        noSavedData.classList.remove('hidden');
    }
}

// Clear saved data
function clearSavedData() {
    localStorage.removeItem('contactFormData');
    
    // Reset form
    if (contactForm) contactForm.reset();
    
    // Reset saved info display
    savedDataContainer.classList.add('hidden');
    noSavedData.classList.remove('hidden');
}