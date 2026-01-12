// Friends of Children Ministries - Main JavaScript

// ============================================
// LESSON DATA - Simulates fetched data from a database
// ============================================
const lessonsData = [
  {
    id: 1,
    title: "God's Amazing Creation",
    scripture: "Genesis 1:1-31",
    category: "creation",
    date: "Dec 1, 2024",
    description: "Explore the wonder of God's creation with hands-on activities and engaging discussions. Students will learn about the seven days of creation and discover their role as caretakers of God's world.",
    link: "lesson1.html",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "Jesus Loves the Little Children",
    scripture: "Mark 10:13-16",
    category: "faith",
    date: "Nov 24, 2024",
    description: "A gentle introduction to Jesus' love for children. Through storytelling, songs, and simple crafts, discover how special each child is to Jesus.",
    link: "lesson2.html",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "Living with Purpose",
    scripture: "Jeremiah 29:11",
    category: "faith",
    date: "Nov 17, 2024",
    description: "Discover God's plan for your life through interactive discussions and real-world applications. Explore gifts, passions, and how to live purposefully for Christ.",
    link: "lesson3.html",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: "The Good Samaritan",
    scripture: "Luke 10:25-37",
    category: "parables",
    date: "Nov 10, 2024",
    description: "Learn about showing kindness to everyone through the parable of the Good Samaritan. Interactive role-play and discussion help understand practical ways to love our neighbors.",
    link: "lesson4.html",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 5,
    title: "Noah's Ark Adventure",
    scripture: "Genesis 6-9",
    category: "creation",
    date: "Nov 3, 2024",
    description: "Join Noah on his amazing adventure with fun animal activities, songs, and crafts. Learn about obedience and God's promises through this beloved story.",
    link: "lesson5.html",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    id: 6,
    title: "Faith in Action",
    scripture: "James 2:14-26",
    category: "faith",
    date: "Oct 27, 2024",
    description: "Challenge everyone to put their faith into action with practical service projects and discussions about living out beliefs in everyday life.",
    link: "lesson6.html",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }
];

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
let currentFilter = 'all';
let currentSearchTerm = '';

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
  initializeSearch();
  initializeFilters();
  initializeSmoothScrolling();
  initializeAddLessonForm();
  initializeScrollAnimations();
});

// Initialize search functionality
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const lessonsGrid = document.getElementById('lessonsGrid');

  if (!searchInput || !searchBtn || !lessonsGrid) return;

  // Search button click handler
  searchBtn.addEventListener('click', function () {
    performSearch();
  });

  // Search on Enter key press
  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Real-time search as user types (with debounce)
  let debounceTimer;
  searchInput.addEventListener('input', function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      performSearch();
    }, 300);
  });
}

// Perform search and filter lessons
function performSearch() {
  const searchInput = document.getElementById('searchInput');
  const lessonsGrid = document.getElementById('lessonsGrid');
  const searchBtn = document.getElementById('searchBtn');

  if (!searchInput || !lessonsGrid) return;

  currentSearchTerm = searchInput.value.toLowerCase().trim();

  // Show loading state
  searchBtn.innerHTML = '🔄 Searching...';
  searchBtn.disabled = true;

  // Simulate async fetch with loading delay
  setTimeout(() => {
    // Filter lessons based on search term and category filter
    const filteredLessons = fetchFilteredLessons(currentSearchTerm, currentFilter);

    // Render the results
    renderLessons(filteredLessons, lessonsGrid);

    // Reset button state
    searchBtn.innerHTML = 'Search';
    searchBtn.disabled = false;

    // Show results count
    showResultsCount(filteredLessons.length);
  }, 500);
}

// Fetch filtered lessons (simulates API call)
function fetchFilteredLessons(searchTerm, categoryFilter) {
  return lessonsData.filter(lesson => {
    // Check category filter
    const categoryMatch = categoryFilter === 'all' || lesson.category === categoryFilter;

    // Check search term
    const searchMatch = searchTerm === '' ||
      lesson.title.toLowerCase().includes(searchTerm) ||
      lesson.scripture.toLowerCase().includes(searchTerm) ||
      lesson.description.toLowerCase().includes(searchTerm) ||
      lesson.category.toLowerCase().includes(searchTerm);

    return categoryMatch && searchMatch;
  });
}

// Render lessons to the grid
function renderLessons(lessons, container) {
  if (lessons.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">📚</div>
        <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">No Lessons Found</h3>
        <p style="color: var(--text-secondary);">Try adjusting your search terms or filters.</p>
        <button onclick="clearSearch()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--gradient-button); color: white; border: none; border-radius: var(--radius-md); cursor: pointer; font-weight: 600;">
          Clear Search
        </button>
      </div>
    `;
    return;
  }

  // Build HTML for lesson cards
  const html = lessons.map((lesson, index) => `
    <article class="lesson-card" data-category="${lesson.category}" style="animation-delay: ${index * 0.1}s;">
      <div class="card-header" style="background: ${lesson.gradient};">
        <span class="card-category">${formatCategory(lesson.category)}</span>
        <span class="card-date">${lesson.date}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${highlightSearchTerm(lesson.title, currentSearchTerm)}</h3>
        <div class="card-scripture">${highlightSearchTerm(lesson.scripture, currentSearchTerm)}</div>
        <p class="card-description">${highlightSearchTerm(lesson.description, currentSearchTerm)}</p>
        <div class="card-footer">
          <a href="${lesson.link}" class="card-link">View Lesson</a>
        </div>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
}

// Format category name for display
function formatCategory(category) {
  const categoryNames = {
    'creation': 'Creation',
    'faith': 'Faith & Purpose',
    'parables': 'Parables'
  };
  return categoryNames[category] || category;
}

// Highlight search term in text
function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
  return text.replace(regex, '<mark style="background: rgba(74, 109, 140, 0.2); padding: 0 2px; border-radius: 2px;">$1</mark>');
}

// Escape special regex characters
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Show results count
function showResultsCount(count) {
  // Remove existing count if any
  const existingCount = document.querySelector('.search-results-count');
  if (existingCount) existingCount.remove();

  // Add new count
  const searchSection = document.querySelector('.search-section');
  if (searchSection) {
    const countElement = document.createElement('div');
    countElement.className = 'search-results-count';
    countElement.style.cssText = 'text-align: center; margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;';

    if (currentSearchTerm) {
      countElement.innerHTML = `Found <strong>${count}</strong> lesson${count !== 1 ? 's' : ''} matching "<em>${currentSearchTerm}</em>"`;
    } else if (currentFilter !== 'all') {
      countElement.innerHTML = `Showing <strong>${count}</strong> lesson${count !== 1 ? 's' : ''} in <em>${formatCategory(currentFilter)}</em>`;
    } else {
      countElement.innerHTML = `Showing <strong>${count}</strong> lesson${count !== 1 ? 's' : ''}`;
    }

    searchSection.appendChild(countElement);
  }
}

// Clear search
function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.value = '';
    currentSearchTerm = '';
  }

  // Reset filter to all
  currentFilter = 'all';
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.classList.remove('active');
    if (tab.dataset.filter === 'all') {
      tab.classList.add('active');
    }
  });

  performSearch();
}

// ============================================
// FILTER TABS FUNCTIONALITY
// ============================================
function initializeFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');

      // Update current filter
      currentFilter = this.dataset.filter;

      // Perform search with new filter
      performSearch();
    });
  });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// RESOURCE TABS (Lesson Detail Page)
// ============================================
function switchResourceTab(event, tabId) {
  const tabs = document.querySelectorAll('.resource-tab');
  const contents = document.querySelectorAll('.resource-content');

  tabs.forEach(tab => tab.classList.remove('active'));
  contents.forEach(content => content.classList.remove('active'));

  event.currentTarget.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initializeScrollAnimations() {
  // Highlight active navigation link in sidebar
  window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.lesson-nav-link');

    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= (sectionTop - 100)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.content-section').forEach(section => {
    observer.observe(section);
  });
}

// ============================================
// ADD LESSON FORM
// ============================================
function initializeAddLessonForm() {
  const addLessonForm = document.getElementById('addLessonForm');

  if (addLessonForm) {
    addLessonForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Collect form data
      const formData = {
        lessonTitle: document.getElementById('lessonTitle').value,
        scripture: document.getElementById('scripture').value,
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        duration: document.getElementById('duration').value,
        ageGroup: document.getElementById('ageGroup').value,
        overview: document.getElementById('overview').value,
        objectives: document.getElementById('objectives').value,
        lessonContent: document.getElementById('lessonContent').value,
        materials: document.getElementById('materials').value,
        discussionQuestions: document.getElementById('discussionQuestions').value,
        articleTitle: document.getElementById('articleTitle')?.value || '',
        articleAuthor: document.getElementById('articleAuthor')?.value || '',
        articleDate: document.getElementById('articleDate')?.value || '',
        articleContent: document.getElementById('articleContent')?.value || '',
        articleLink: document.getElementById('articleLink')?.value || '',
        videoUrl: document.getElementById('videoUrl')?.value || '',
        audioUrl: document.getElementById('audioUrl')?.value || ''
      };

      // Log form data (in a real application, this would be sent to a server)
      console.log('New Lesson Data:', formData);

      // Show success message
      alert('✅ Lesson Added Successfully!\n\nNote: This is a demonstration. In a production environment, this data would be saved to a database.');

      // Reset form
      addLessonForm.reset();
    });
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Make clearSearch available globally
window.clearSearch = clearSearch;
