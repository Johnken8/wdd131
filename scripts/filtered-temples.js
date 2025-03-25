// Temple data array
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // Additional temples with proper URLs that work with lazy loading
  {
    templeName: "Lagos Nigeria",
    location: "Lagos, Nigeria",
    dedicated: "2023, June, 3",
    area: 12000,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake City Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
    "./images/salt-lake-city-utah-temple.jpg"
  },
  {
    templeName: "Provo City Center",
    location: "Provo, Utah, United States",
    dedicated: "2016, March, 20",
    area: 85084,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/400x250/provo-city-center-temple-1572517-wallpaper.jpg"
  }
];

// DOM Elements
const templeGrid = document.getElementById('temple-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const hamburgerButton = document.getElementById('hamburger-menu');
const mainNav = document.getElementById('main-nav');

// Function to create a temple card
function createTempleCard(temple) {
  const card = document.createElement('div');
  card.className = 'temple-card';
  
  // Format the dedication date
  const dedicationParts = temple.dedicated.split(', ');
  const formattedDate = `${dedicationParts[1]} ${dedicationParts[0]}, ${dedicationParts[2]}`;
  
  // Create the card HTML
  card.innerHTML = `
    <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
    <div class="temple-details">
      <h3 class="temple-name">${temple.templeName} Temple</h3>
      <p class="temple-location"><span>Location:</span> ${temple.location}</p>
      <p class="temple-dedicated"><span>Dedicated:</span> ${formattedDate}</p>
      <p class="temple-area"><span>Area:</span> ${temple.area.toLocaleString()} square feet</p>
    </div>
  `;
  
  return card;
}

// Function to display temples based on filter
function displayTemples(filter = 'all') {
  // Show loading indicator
  templeGrid.innerHTML = '<div class="loading"><div class="loading-spinner"></div></div>';
  
  // Use setTimeout to allow the loading indicator to render
  setTimeout(() => {
    // Clear the temple grid
    templeGrid.innerHTML = '';
    
    // Filter temples based on the selected filter
    let filteredTemples;
    
    switch(filter) {
      case 'old':
        // Temples built before 1900 (changed to be more precise)
        filteredTemples = temples.filter(temple => {
          const year = parseInt(temple.dedicated.split(', ')[2]);
          return year < 1900;
        });
        break;
      case 'new':
        // Precisely filter temples built after 2000
        filteredTemples = temples.filter(temple => {
          const year = parseInt(temple.dedicated.split(', ')[2]);
          return year > 2000;
        });
        break;
      case 'large':
        // Precisely filter temples larger than 90,000 square feet
        filteredTemples = temples.filter(temple => temple.area > 90000);
        break;
      case 'small':
        // Precisely filter temples smaller than 10,000 square feet
        filteredTemples = temples.filter(temple => temple.area < 10000);
        break;
      default:
        // All temples
        filteredTemples = temples;
    }
    
    // Check if any temples match the filter
    if (filteredTemples.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      // Add specific message for each filter type
      noResults.textContent = filter === 'old' ? 'No temples built before 1900.' :
                               filter === 'new' ? 'No temples built after 2000.' :
                               filter === 'large' ? 'No temples larger than 90,000 sq ft.' :
                               filter === 'small' ? 'No temples smaller than 10,000 sq ft.' :
                               'No temples found.';
      templeGrid.appendChild(noResults);
      return;
    }
    
    // Create and append temple cards
    filteredTemples.forEach((temple, index) => {
      const card = createTempleCard(temple);
      // Add a slight delay to each card for a staggered animation effect
      card.style.animationDelay = `${index * 0.1}s`;
      templeGrid.appendChild(card);
    });
    
    // Update page title to reflect current filter
    const filterTitles = {
      'all': 'All Temples',
      'old': 'Old Temples (Built Before 1900)',
      'new': 'New Temples (Built After 2000)',
      'large': 'Large Temples (Over 90,000 sq ft)',
      'small': 'Small Temples (Under 10,000 sq ft)'
    };
    document.querySelector('h2').textContent = filterTitles[filter];
  }, 300); // Short delay to show loading indicator
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    this.classList.add('active');
    
    // Get the filter value
    const filter = this.getAttribute('data-filter');
    
    // Display temples based on the filter
    displayTemples(filter);
    
    // Close mobile menu after filter selection
    if (window.innerWidth < 768) {
      mainNav.classList.remove('open');
      hamburgerButton.textContent = '≡';
      hamburgerButton.setAttribute('aria-expanded', 'false');
      hamburgerButton.setAttribute('aria-label', 'Menu');
    }
    
    // Update page focus for accessibility
    document.querySelector('h1').focus();
    // Announce filter change for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('role', 'status');
    announcement.className = 'sr-only';
    announcement.textContent = `Displaying ${filter} temples`;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  });
});

// Hamburger menu functionality
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
    hamburgerButton.setAttribute('aria-label', 'Menu');
  }
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('header') && mainNav.classList.contains('open')) {
    mainNav.classList.remove('open');
    hamburgerButton.textContent = '≡';
    hamburgerButton.setAttribute('aria-label', 'Menu');
    hamburgerButton.setAttribute('aria-expanded', 'false');
  }
});

// Add keyboard accessibility for navigation
document.addEventListener('keydown', function(event) {
  // Close menu on Escape key
  if (event.key === 'Escape' && mainNav.classList.contains('open')) {
    mainNav.classList.remove('open');
    hamburgerButton.textContent = '≡';
    hamburgerButton.setAttribute('aria-label', 'Menu');
    hamburgerButton.setAttribute('aria-expanded', 'false');
    hamburgerButton.focus(); // Return focus to the hamburger button
  }
});

// Copyright year
const currentYearSpan = document.getElementById('currentYear');
currentYearSpan.textContent = new Date().getFullYear();

// Last modified date
const lastModifiedParagraph = document.getElementById('lastModified');
lastModifiedParagraph.textContent = `Last Modified: ${document.lastModified}`;

// Initialize the page with all temples
document.addEventListener('DOMContentLoaded', function() {
  // Add skip link for accessibility
  const skipLink = document.createElement('a');
  skipLink.href = '#temple-grid';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to content';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Make all interactive elements properly focusable
  const templeCards = document.querySelectorAll('.temple-card');
  templeCards.forEach(card => {
    card.setAttribute('tabindex', '0');
  });
  
  // Display all temples on initial load
  displayTemples('all');
});