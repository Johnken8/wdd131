// Product array from assignment
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Populate product options
function populateProducts() {
  const productSelect = document.getElementById('product');
  
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.name.charAt(0).toUpperCase() + product.name.slice(1);
    productSelect.appendChild(option);
  });
}

// Update footer year and last modified date
function updateFooter() {
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
}

// Initialize form
function init() {
  populateProducts();
  updateFooter();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);