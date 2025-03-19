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
    // Additional temples
    {
      templeName: "Lagos Nigeria",
      location: "Lagos, Nigeria",
      dedicated: "2023, June, 3",
      area: 12000,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lagos-nigeria/400x250/lagos-nigeria-temple-rendering.jpg"
    },
    {
      templeName: "Salt Lake City Utah",
      location: "Salt Lake City, Utah, United States",
      dedicated: "1893, April, 6",
      area: 253015,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/400x250/slc-temple-lds-1246745-wallpaper.jpg"
    },
    {
      templeName: "Provo City Center",
      location: "Provo, Utah, United States",
      dedicated: "2016, March, 20",
      area: 85084,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/400x250/provo-city-center-temple-exterior-1572517-wallpaper.jpg"
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
    // Clear the temple grid
    templeGrid.innerHTML = '';
    
    // Filter temples based on the selected filter
    let filteredTemples;
    
    switch(filter) {
      case 'old':
        // Temples built before 1900
        filteredTemples = temples.filter(temple => {
          const year = parseInt(temple.dedicated.split(', ')[2]);
          return year < 1900;
        });
        break;
      case 'new':
        // Temples built after 2000
        filteredTemples = temples.filter(temple => {
          const year = parseInt(temple.dedicated.split(', ')[2]);
          return year > 2000;
        });
        break;
      case 'large':
        // Temples larger than 90,000 square feet
        filteredTemples = temples.filter(temple => temple.area > 90000);
        break;
      case 'small':
        // Temples smaller than 10,000 square feet
        filteredTemples = temples.filter(temple => temple.area < 10000);
        break;
      default:
        // All temples
        filteredTemples = temples;
    }
    
    // Create and append temple cards
    filteredTemples.forEach(temple => {
      const card = createTempleCard(temple);
      templeGrid.appendChild(card);
    });
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
        hamburgerButton.setAttribute('aria-label', 'Open menu');
      }
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
      hamburgerButton.setAttribute('aria-label', 'Open menu');
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!event.target.closest('header') && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      hamburgerButton.textContent = '≡';
      hamburgerButton.setAttribute('aria-label', 'Open menu');
      hamburgerButton.setAttribute('aria-expanded', 'false');
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
    displayTemples('all');
  });