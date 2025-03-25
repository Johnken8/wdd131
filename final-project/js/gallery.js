// Gallery page functionality

// DOM Elements
const galleryGrid = document.getElementById('gallery-grid');
const galleryFilter = document.getElementById('gallery-filter');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const closeModal = document.querySelector('.close-modal');
const prevImageBtn = document.getElementById('prev-image');
const nextImageBtn = document.getElementById('next-image');

// Gallery data - array of objects
const galleryData = [
    {
        id: 1,
        title: 'Zuma Rock',
        description: 'The famous monolith located in Niger State, near Abuja.',
        category: 'landmarks',
        imageSrc: 'images/zuma-rock.jpg'
    },
    {
        id: 2,
        title: 'Osun-Osogbo Sacred Grove',
        description: 'UNESCO World Heritage site and home to Yoruba goddess of fertility.',
        category: 'landmarks',
        imageSrc: 'images/osun-grove.jpg'
    },
    {
        id: 3,
        title: 'Calabar Carnival',
        description: 'Africa\'s biggest street party held annually in December.',
        category: 'culture',
        imageSrc: 'images/calabar-carnival.jpg'
    },
    {
        id: 4,
        title: 'Durbar Festival',
        description: 'Traditional horse riding festival celebrated in northern Nigeria.',
        category: 'culture',
        imageSrc: 'images/durbar-festival.jpg'
    },
    {
        id: 5,
        title: 'Yankari National Park',
        description: 'Wildlife reserve featuring natural springs and diverse animal species.',
        category: 'nature',
        imageSrc: 'images/yankari-park.jpg'
    },
    {
        id: 6,
        title: 'Obudu Mountain Resort',
        description: 'Beautiful highland resort with breathtaking views in Cross River State.',
        category: 'nature',
        imageSrc: 'images/obudu-resort.jpg'
    },
    {
        id: 7,
        title: 'Jollof Rice',
        description: 'Iconic Nigerian dish known worldwide for its rich flavors.',
        category: 'food',
        imageSrc: 'images/jollof-rice.jpg'
    },
    {
        id: 8,
        title: 'Egusi Soup',
        description: 'Traditional soup made with ground melon seeds and vegetables.',
        category: 'food',
        imageSrc: 'images/egusi-soup.jpg'
    },
    {
        id: 9,
        title: 'Lekki Conservation Centre',
        description: 'Nature reserve with Africa\'s longest canopy walkway.',
        category: 'nature',
        imageSrc: 'images/lekki-conservation.jpg'
    }
];

// Current gallery state
let currentGallery = [...galleryData];
let currentImageIndex = 0;

// Initialize the gallery
document.addEventListener('DOMContentLoaded', () => {
    populateGallery(currentGallery);
    
    // Filter event listener
    if (galleryFilter) {
        galleryFilter.addEventListener('change', filterGallery);
    }
    
    // Modal event listeners
    if (closeModal) {
        closeModal.addEventListener('click', closeImageModal);
    }
    
    if (prevImageBtn) {
        prevImageBtn.addEventListener('click', showPreviousImage);
    }
    
    if (nextImageBtn) {
        nextImageBtn.addEventListener('click', showNextImage);
    }
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
});

// Populate gallery with items
function populateGallery(items) {
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';
    
    if (items.length === 0) {
        const noResults = document.createElement('p');
        noResults.className = 'no-results';
        noResults.textContent = 'No gallery items found in this category.';
        galleryGrid.appendChild(noResults);
        return;
    }
    
    items.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.category = item.category;
        galleryItem.dataset.index = index;
        
        galleryItem.innerHTML = `
            <img 
                class="gallery-image" 
                data-src="${item.imageSrc}" 
                alt="${item.title}" 
                loading="lazy"
            >
            <div class="gallery-caption">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        galleryItem.addEventListener('click', () => openImageModal(index));
        galleryGrid.appendChild(galleryItem);
    });
    
    // Initialize lazy loading for gallery images
    initLazyLoading();
}

// Filter gallery by category
function filterGallery() {
    const category = galleryFilter.value;
    
    if (category === 'all') {
        currentGallery = [...galleryData];
    } else {
        currentGallery = galleryData.filter(item => item.category === category);
    }
    
    populateGallery(currentGallery);
}

// Open image modal
function openImageModal(index) {
    if (!imageModal || !modalImage || !modalCaption) return;
    
    currentImageIndex = index;
    const item = currentGallery[index];
    
    modalImage.src = item.imageSrc;
    modalCaption.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
    
    imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close image modal
function closeImageModal() {
    if (!imageModal) return;
    
    imageModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Show previous image in modal
function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    openImageModal(currentImageIndex);
}

// Show next image in modal
function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
    openImageModal(currentImageIndex);
}