// Get URL parameters
function getUrlParameters() {
  const params = {};
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  
  for (const [key, value] of urlParams) {
    params[key] = value;
  }
  
  return params;
}

// Update the review counter using localStorage
function updateReviewCounter() {
  let count = localStorage.getItem('reviewCount') || 0;
  count = parseInt(count) + 1;
  localStorage.setItem('reviewCount', count);
  document.getElementById('review-count').textContent = count;
}

// Display review details
function displayReviewDetails() {
  const params = getUrlParameters();
  const detailsContainer = document.getElementById('review-details');
  
  if (Object.keys(params).length > 0) {
    let html = '<h3>Review Details:</h3><ul>';
    
    // Get product name from ID
    const products = [
      { id: "fc-1888", name: "Flux Capacitor" },
      { id: "fc-2050", name: "Power Laces" },
      { id: "fs-1987", name: "Time Circuits" },
      { id: "ac-2000", name: "Low Voltage Reactor" },
      { id: "jj-1969", name: "Warp Equalizer" }
    ];
    
    if (params.product) {
      const product = products.find(p => p.id === params.product);
      html += `<li><strong>Product:</strong> ${product ? product.name : params.product}</li>`;
    }
    
    if (params.rating) {
      html += `<li><strong>Rating:</strong> ${params.rating} star${params.rating > 1 ? 's' : ''}</li>`;
    }
    
    if (params['installation-date']) {
      html += `<li><strong>Installation Date:</strong> ${params['installation-date']}</li>`;
    }
    
    if (params.features) {
      const features = Array.isArray(params.features) ? params.features : [params.features];
      html += `<li><strong>Useful Features:</strong> ${features.join(', ')}</li>`;
    }
    
    if (params.review) {
      html += `<li><strong>Review:</strong> ${params.review}</li>`;
    }
    
    if (params.username) {
      html += `<li><strong>Submitted by:</strong> ${params.username}</li>`;
    }
    
    html += '</ul>';
    detailsContainer.innerHTML = html;
  } else {
    detailsContainer.innerHTML = '<p>No review details available.</p>';
  }
}

// Update footer year and last modified date
function updateFooter() {
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
}

// Initialize page
function init() {
  updateReviewCounter();
  displayReviewDetails();
  updateFooter();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);