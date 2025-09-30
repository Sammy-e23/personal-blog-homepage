// Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: "Getting Started with React Hooks",
        description: "Learn how to use React Hooks to build modern, functional components with state management.",
        category: "tech",
        date: "September 15, 2025",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop"
    },
    {
        id: 2,
        title: "Exploring the Streets of Tokyo",
        description: "A journey through the bustling streets and hidden gems of Japan's vibrant capital city.",
        category: "travel",
        date: "July 10, 2025",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop"
    },
    {
        id: 3,
        title: "The Perfect Homemade Pizza Recipe",
        description: "Master the art of making authentic Italian pizza at home with this step-by-step guide.",
        category: "food",
        date: "March 8, 2025",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=500&fit=crop"
    },
    {
        id: 4,
        title: "Understanding JavaScript Closures",
        description: "Deep dive into one of JavaScript's most powerful features and how to use it effectively.",
        category: "tech",
        date: "August 5, 2025",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=500&fit=crop"
    },
    {
        id: 5,
        title: "Backpacking Through Europe",
        description: "Tips and tricks for budget-friendly travel across the most beautiful cities in Europe.",
        category: "travel",
        date: "February 28, 2025",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop"
    },
    {
        id: 6,
        title: "Authentic Thai Green Curry",
        description: "Bring the flavors of Thailand to your kitchen with this aromatic and spicy curry recipe.",
        category: "food",
        date: "August 25, 2025",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=500&fit=crop"
    },
    {
        id: 7,
        title: "Building REST APIs with Node.js",
        description: "Learn how to create scalable and efficient REST APIs using Node.js and Express.",
        category: "tech",
        date: "June 20, 2025",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop"
    },
    {
        id: 8,
        title: "Safari Adventures in Kenya",
        description: "Experience the thrill of witnessing wildlife in their natural habitat in the African savanna.",
        category: "travel",
        date: "September 18, 2025",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=500&fit=crop"
    },
    {
        id: 9,
        title: "Mastering French Pastries",
        description: "From croissants to macarons, learn the secrets behind classic French baking.",
        category: "food",
        date: "February 10, 2025",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=500&fit=crop"
    },
    {
        id: 10,
        title: "CSS Grid Layout Guide",
        description: "Complete guide to creating responsive layouts with CSS Grid, the modern way.",
        category: "tech",
        date: "June 9, 2025",
        image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=500&fit=crop"
    },
    {
        id: 11,
        title: "Hidden Beaches of Bali",
        description: "Discover the most beautiful and secluded beaches away from the tourist crowds.",
        category: "travel",
        date: "January 30, 2025",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop"
    },
    {
        id: 12,
        title: "Vegan Comfort Food Recipes",
        description: "Delicious plant-based versions of your favorite comfort foods that everyone will love.",
        category: "food",
        date: "January 25, 2025",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=500&fit=crop"
    }
];

// State Management
let currentPage = 1;
let postsPerPage = 6;
let currentCategory = 'all';
let searchQuery = '';

// DOM Elements
const blogGrid = document.getElementById('blogGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');
const noResults = document.getElementById('noResults');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Category filter
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            currentPage = 1;
            renderPosts();
        });
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        currentPage = 1;
        renderPosts();
    });

    // Pagination
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    nextBtn.addEventListener('click', () => {
        const filteredPosts = getFilteredPosts();
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// Get Filtered Posts
function getFilteredPosts() {
    return blogPosts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
}

// Render Posts
function renderPosts() {
    const filteredPosts = getFilteredPosts();
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);

    // Clear grid
    blogGrid.innerHTML = '';

    // Show/hide no results message
    if (filteredPosts.length === 0) {
        noResults.style.display = 'block';
        document.getElementById('pagination').style.display = 'none';
        return;
    } else {
        noResults.style.display = 'none';
        document.getElementById('pagination').style.display = 'flex';
    }

    // Render posts
    postsToShow.forEach((post, index) => {
        const postCard = createPostCard(post, index);
        blogGrid.appendChild(postCard);
    });

    // Update pagination
    updatePagination(totalPages);
}

// Create Post Card
function createPostCard(post, index) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
        <img src="${post.image}" alt="${post.title}" class="blog-card-image">
        <div class="blog-card-content">
            <span class="blog-card-category">${post.category}</span>
            <h3 class="blog-card-title">${post.title}</h3>
            <p class="blog-card-description">${post.description}</p>
            <div class="blog-card-footer">
                <span class="blog-card-date">
                    <i class="far fa-calendar"></i>
                    ${post.date}
                </span>
                <a href="#" class="read-more">
                    Read More
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        </div>
    `;

    return card;
}

// Update Pagination
function updatePagination(totalPages) {
    // Update buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;

    // Clear page numbers
    pageNumbers.innerHTML = '';

    // Create page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('div');
        pageBtn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pageNumbers.appendChild(pageBtn);
    }
}