// Friends of Children Ministries - Main JavaScript

// ============================================
// LESSON DATA - Simulates fetched data from a database
// ============================================
const defaultGradients = {
  creation: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  faith: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  parables: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  other: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
};

const defaultLessons = [
  {
    id: 1,
    title: "God's Amazing Creation",
    scripture: "Genesis 1:1-31",
    category: "creation",
    date: "Dec 1, 2025",
    description: "Explore the wonder of God's creation with hands-on activities and engaging discussions. Students will learn about the seven days of creation and discover their role as caretakers of God's world.",
    link: "lesson1.html",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  {
    id: 2,
    title: "Jesus Loves the Little Children",
    scripture: "Mark 10:13-16",
    category: "faith",
    date: "Nov 24, 2025",
    description: "A gentle introduction to Jesus' love for children. Through storytelling, songs, and simple crafts, discover how special each child is to Jesus.",
    link: "lesson2.html",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
  },
  {
    id: 3,
    title: "Living with Purpose",
    scripture: "Jeremiah 29:11",
    category: "faith",
    date: "Nov 17, 2025",
    description: "Discover God's plan for your life through interactive discussions and real-world applications. Explore gifts, passions, and how to live purposefully for Christ.",
    link: "lesson3.html",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  },
  {
    id: 4,
    title: "The Good Samaritan",
    scripture: "Luke 10:25-37",
    category: "parables",
    date: "Nov 10, 2025",
    description: "Learn about showing kindness to everyone through the parable of the Good Samaritan. Interactive role-play and discussion help understand practical ways to love our neighbors.",
    link: "lesson4.html",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
  },
  {
    id: 5,
    title: "Noah's Ark Adventure",
    scripture: "Genesis 6-9",
    category: "creation",
    date: "Nov 3, 2025",
    description: "Join Noah on his amazing adventure with fun animal activities, songs, and crafts. Learn about obedience and God's promises through this beloved story.",
    link: "lesson5.html",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
  },
  {
    id: 6,
    title: "Faith in Action",
    scripture: "James 2:14-26",
    category: "faith",
    date: "Oct 27, 2025",
    description: "Challenge everyone to put their faith into action with practical service projects and discussions about living out beliefs in everyday life.",
    link: "lesson6.html",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  }
];

function loadLessonsData() {
  const stored = sessionStorage.getItem('cms_lessons');
  if (stored) {
    const list = JSON.parse(stored);
    const published = list.filter(l => l.status !== 'draft');
    return published.map(l => {
      if (l.id <= 6) {
        const d = defaultLessons.find(dl => dl.id === l.id);
        return {
          ...d,
          title: l.title,
          scripture: l.scripture,
          category: l.category,
          description: l.description || '',
          gradient: defaultGradients[l.category] || defaultGradients.other
        };
      }
      return {
        id: l.id,
        title: l.title,
        scripture: l.scripture,
        category: l.category,
        date: l.createdAt ? new Date(l.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
        description: l.description || '',
        link: `lesson1.html?id=${l.id}`,
        gradient: defaultGradients[l.category] || defaultGradients.other
      };
    });
  }
  return defaultLessons;
}

const lessonsData = loadLessonsData();

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
  initializeMobileMenu();
});

// Initialize search functionality
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const lessonsGrid = document.getElementById('lessonsGrid');

  if (!searchInput || !searchBtn || !lessonsGrid) return;

  // Render initial dynamic list of lessons
  renderLessons(lessonsData, lessonsGrid);

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
  searchBtn.innerHTML = 'Searching…';
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

// Contextually accurate photo backgrounds for each lesson
const lessonImages = {
  1: "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=75&fit=crop')",  // Earth/creation — God's Amazing Creation
  2: "url('https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=75&fit=crop')",  // Children in Sunday School — Jesus Loves Children
  3: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75&fit=crop')",  // Person reading Bible — Living with Purpose
  4: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=75&fit=crop')",  // Helping hands — Good Samaritan
  5: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=75&fit=crop')",  // Rainbow/landscape — Noah's Ark
  6: "url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=75&fit=crop')"   // Hands serving — Faith in Action
};
const categoryImages = {
  creation: "url('https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=75&fit=crop')",  // Earth/nature
  faith:    "url('https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600&q=75&fit=crop')",  // Children worshipping
  parables: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=75&fit=crop')",  // Helping/community
  other:    "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75&fit=crop')"   // Bible study
};

// Render lessons to the grid
function renderLessons(lessons, container) {
  if (lessons.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
        <div style="font-size: 3rem; margin-bottom: 1rem; opacity:.3; color:var(--text-muted);">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" viewBox="0 0 16 16">
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
          </svg>
        </div>
        <h3 style="color: var(--text-primary); margin-bottom: 0.5rem;">No Lessons Found</h3>
        <p style="color: var(--text-secondary);">Try adjusting your search terms or filters.</p>
        <button onclick="clearSearch()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: var(--gradient-button); color: white; border: none; border-radius: var(--radius-md); cursor: pointer; font-weight: 600;">
          Clear Search
        </button>
      </div>
    `;
    return;
  }

  // Build HTML for lesson cards with photo backgrounds
  const html = lessons.map((lesson, index) => {
    const imgUrl = lessonImages[lesson.id] || categoryImages[lesson.category] || categoryImages.other;
    const headerBg = `linear-gradient(180deg,rgba(0,0,0,.3) 0%,rgba(0,20,60,.5) 100%), ${imgUrl}`;
    return `
    <article class="lesson-card" data-category="${lesson.category}" style="animation-delay: ${index * 0.1}s;">
      <div class="card-header" style="background: ${headerBg}; background-size: cover; background-position: center;">
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
  `}).join('');

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

      // Show success message inline
      const form = addLessonForm;
      const successMsg = document.createElement('div');
      successMsg.style.cssText = 'margin-top:1rem;padding:1rem 1.5rem;background:#dcfce7;border-left:4px solid #16a34a;border-radius:0 var(--radius-md) var(--radius-md) 0;color:#166534;font-weight:600;';
      successMsg.textContent = 'Lesson added successfully!';
      form.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 4000);

      // Reset form
      addLessonForm.reset();
    });
  }
}

// ============================================
// MOBILE MENU FUNCTIONALITY
// ============================================
function initializeMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (!mobileMenuToggle || !navLinks) return;

  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking on a link
  navLinks.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Close menu on window resize if it gets too wide
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Make clearSearch available globally
window.clearSearch = clearSearch;
