/* ============================================
   ADMIN SHARED MODULE
   Auth, sidebar, clock, audit, toasts, data
   ============================================ */

// ========== AUTH GUARD ==========
function checkAuth(requireAdmin = false) {
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
        return false;
    }
    if (requireAdmin && sessionStorage.getItem('adminRole') !== 'system_admin') {
        window.location.href = 'admin.html';
        return false;
    }
    return true;
}

function getUser() {
    return {
        name: sessionStorage.getItem('adminUsername') || 'Admin',
        role: sessionStorage.getItem('adminRole') || 'editor',
        roleName: sessionStorage.getItem('adminRoleName') || 'Editor',
        email: sessionStorage.getItem('adminEmail') || '',
        avatar: sessionStorage.getItem('adminAvatar') || 'user',
        id: parseInt(sessionStorage.getItem('adminUserId') || '0')
    };
}

function isSystemAdmin() {
    return sessionStorage.getItem('adminRole') === 'system_admin';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        addAuditEntry('LOGOUT', 'Session', getUser().name + ' logged out');
        sessionStorage.removeItem('adminLoggedIn');
        sessionStorage.removeItem('adminUsername');
        sessionStorage.removeItem('adminRole');
        sessionStorage.removeItem('adminRoleName');
        sessionStorage.removeItem('adminEmail');
        sessionStorage.removeItem('adminUserId');
        sessionStorage.removeItem('adminAvatar');
        localStorage.removeItem('adminRemember');
        window.location.href = 'admin-login.html';
    }
}

// ========== SIDEBAR RENDERER ==========
function renderSidebar(activePage) {
    const user = getUser();
    const sysAdminOnly = isSystemAdmin();

    const links = [
        { section: 'Overview' },
        { id: 'dashboard',         label: 'Dashboard',        icon: 'fas fa-th-large',      href: 'admin.html' },
        { section: 'Content Management' },
        { id: 'lessons',           label: 'Lessons',           icon: 'fas fa-book-open',     href: 'admin-manage-lessons.html',       count: getDataCount('lessons') },
        { id: 'blog',              label: 'Blog Posts',        icon: 'fas fa-newspaper',     href: 'admin-manage-blog.html',          count: getDataCount('blogPosts') },
        { id: 'bible-studies',     label: 'Bible Studies',     icon: 'fas fa-cross',         href: 'admin-manage-bible-studies.html', count: getDataCount('bibleStudies') },
        { id: 'resources',         label: 'Resources',         icon: 'fas fa-folder-open',   href: 'admin-manage-resources.html',     count: getDataCount('resources') },
        { id: 'events',            label: 'Events',            icon: 'fas fa-calendar-alt',  href: 'admin-manage-events.html',        count: getDataCount('events') },
        { id: 'tips',              label: 'Teaching Tips',     icon: 'fas fa-lightbulb',     href: 'admin-manage-tips.html',          count: getDataCount('teachingTips') },
        { id: 'media-library',     label: 'Media Library',     icon: 'fas fa-photo-video',   href: 'admin-media-library.html' },
        { section: 'Premium & Payments' },
        { id: 'premium-content',   label: 'Premium Content',   icon: 'fas fa-crown',         href: 'admin-premium-content.html',      adminOnly: true },
        { section: 'Telegram Integration' },
        { id: 'telegram-imports',  label: 'Telegram Imports',  icon: 'fab fa-telegram',      href: 'admin-telegram-imports.html',     adminOnly: true },
        { id: 'telegram-config',   label: 'Telegram Config',   icon: 'fas fa-robot',         href: 'admin-telegram-config.html',      adminOnly: true },
        { section: 'Administration' },
        { id: 'users',             label: 'Users',             icon: 'fas fa-users',         href: 'admin-manage-users.html',         adminOnly: true },
        { id: 'audit',             label: 'Audit Log',         icon: 'fas fa-clipboard-list',href: 'admin-audit-log.html',            adminOnly: true },
        { id: 'system-operations', label: 'System Operations', icon: 'fas fa-server',        href: 'admin-system-operations.html',    adminOnly: true },
        { id: 'settings',          label: 'Site Settings',     icon: 'fas fa-sliders-h',     href: 'admin-settings.html',             adminOnly: true },
    ];

    let html = `
        <div class="sidebar-header">
            <a href="admin.html" class="sidebar-brand">
                <i class="fas fa-church" style="font-size:.9rem;opacity:.7;"></i>
                FCM <span class="sidebar-badge">CMS</span>
            </a>
            <div class="sidebar-clock">
                <span class="clock-time" id="sidebarClock">--:--:--</span>
                <span id="sidebarDate"></span>
            </div>
        </div>
        <nav class="sidebar-nav">
    `;

    links.forEach(link => {
        if (link.section) {
            html += `<div class="nav-section-title">${link.section}</div>`;
            return;
        }
        if (link.adminOnly && !sysAdminOnly) return;
        const isActive = activePage === link.id;
        const countHtml = link.count !== undefined ? `<span class="nav-count">${link.count}</span>` : '';
        html += `<a href="${link.href}" class="sidebar-link${isActive ? ' active' : ''}">
            <span class="nav-icon"><i class="${link.icon}"></i></span>
            <span>${link.label}</span>
            ${countHtml}
        </a>`;
    });

    html += `
        </nav>
        <div class="sidebar-user">
            <div class="sidebar-avatar"><i class="fas fa-user-circle" style="font-size:1.3rem;color:rgba(255,255,255,0.6);"></i></div>
            <div class="sidebar-user-info">
                <div class="sidebar-user-name">${user.name}</div>
                <div class="sidebar-user-role">${user.roleName}</div>
            </div>
            <button class="btn-sidebar-logout" onclick="logout()">Exit</button>
        </div>
    `;

    const sidebar = document.querySelector('.admin-sidebar');
    if (sidebar) sidebar.innerHTML = html;

    // Start clock
    updateClock();
    setInterval(updateClock, 1000);

    // Mobile toggle
    const toggle = document.querySelector('.sidebar-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }
}

// ========== CLOCK ==========
function updateClock() {
    const now = new Date();
    const clockEl = document.getElementById('sidebarClock');
    const dateEl = document.getElementById('sidebarDate');
    if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
    if (dateEl) {
        dateEl.textContent = ' · ' + now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
}

// ========== TOAST NOTIFICATIONS ==========
function showToast(message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = { success: '<i class="fas fa-check-circle"></i>', error: '<i class="fas fa-times-circle"></i>', info: '<i class="fas fa-info-circle"></i>' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || icons.info}</span>
        <span class="toast-text">${message}</span>
        <button class="toast-close" onclick="this.parentElement.classList.add('removing'); setTimeout(() => this.parentElement.remove(), 300)">&times;</button>
    `;
    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

// ========== AUDIT LOG ==========
function addAuditEntry(action, entity, detail) {
    const user = getUser();
    const log = JSON.parse(sessionStorage.getItem('auditLog') || '[]');
    log.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        user: user.name,
        role: user.roleName,
        action: action,
        entity: entity,
        detail: detail,
        ip: '192.168.1.' + Math.floor(Math.random() * 255)
    });
    // Keep last 200 entries
    if (log.length > 200) log.length = 200;
    sessionStorage.setItem('auditLog', JSON.stringify(log));
}

function getAuditLog() {
    return JSON.parse(sessionStorage.getItem('auditLog') || '[]');
}

// ========== SEED DATA ==========
function getDataCount(key) {
    const data = getData(key);
    return data.length;
}

function getData(key) {
    const stored = sessionStorage.getItem('cms_' + key);
    if (stored) return JSON.parse(stored);
    // Seed default data
    const seeds = getSeedData();
    if (seeds[key]) {
        sessionStorage.setItem('cms_' + key, JSON.stringify(seeds[key]));
        return seeds[key];
    }
    return [];
}

function setData(key, data) {
    sessionStorage.setItem('cms_' + key, JSON.stringify(data));
}

function getSeedData() {
    return {
        lessons: [
            { id: 1, title: "God's Amazing Creation", scripture: "Genesis 1:1-31", category: "creation", description: "Explore the wonder of God's creation.", status: "published", createdAt: "2025-09-15" },
            { id: 2, title: "Jesus Loves the Little Children", scripture: "Mark 10:13-16", category: "faith", description: "A gentle introduction to Jesus' love.", status: "published", createdAt: "2025-09-22" },
            { id: 3, title: "Living with Purpose", scripture: "Jeremiah 29:11", category: "faith", description: "Discover God's plan for your life.", status: "published", createdAt: "2025-10-01" },
            { id: 4, title: "The Good Samaritan", scripture: "Luke 10:25-37", category: "parables", description: "Learn about showing kindness to everyone.", status: "published", createdAt: "2025-10-08" },
            { id: 5, title: "Noah's Ark Adventure", scripture: "Genesis 6-9", category: "creation", description: "Join Noah on his amazing adventure.", status: "published", createdAt: "2025-10-15" },
            { id: 6, title: "Faith in Action", scripture: "James 2:14-26", category: "faith", description: "Put faith into action with service.", status: "draft", createdAt: "2025-11-01" }
        ],
        blogPosts: [
            { id: 1, title: "How to Engage Kids in Sunday School", author: "Sarah Njeri", category: "teaching", excerpt: "Practical tips for keeping children engaged.", status: "published", createdAt: "2025-08-10", premium: false },
            { id: 2, title: "The Power of Story-Based Learning", author: "David Kamau", category: "methodology", excerpt: "Why stories stick with young learners.", status: "published", createdAt: "2025-08-20", premium: false },
            { id: 3, title: "Creating a Safe Classroom Environment", author: "Grace Wanjiku", category: "safety", excerpt: "Building trust and safety for children.", status: "draft", createdAt: "2025-09-05", premium: true }
        ],
        bibleStudies: [
            { id: 1, title: "Fruits of the Spirit", scripture: "Galatians 5:22-23", description: "Deep dive into the nine fruits of the Spirit.", sessions: 9, level: "intermediate", status: "published", createdAt: "2025-07-01" },
            { id: 2, title: "The Beatitudes", scripture: "Matthew 5:1-12", description: "Exploring Jesus' teaching on blessedness.", sessions: 8, level: "beginner", status: "published", createdAt: "2025-07-15" },
            { id: 3, title: "Heroes of Faith", scripture: "Hebrews 11", description: "Learning from faith heroes of the Bible.", sessions: 12, level: "advanced", status: "draft", createdAt: "2025-08-01" }
        ],
        resources: [
            { id: 1, title: "Sunday School Starter Kit", type: "pdf", category: "curriculum", description: "Complete starter kit for new teachers.", fileSize: "2.4 MB", downloads: 145, status: "published", createdAt: "2025-06-01" },
            { id: 2, title: "Coloring Book - Creation", type: "pdf", category: "activities", description: "Printable coloring pages on Creation.", fileSize: "5.1 MB", downloads: 312, status: "published", createdAt: "2025-06-15" },
            { id: 3, title: "Worship Songs Collection", type: "audio", category: "music", description: "Children's worship songs compilation.", fileSize: "45 MB", downloads: 89, status: "published", createdAt: "2025-07-10" }
        ],
        events: [
            { id: 1, title: "Annual Children's Ministry Conference", date: "2026-07-15", time: "09:00", location: "Nairobi Convention Center", description: "Gathering of children's ministry leaders.", capacity: 500, registered: 234, status: "upcoming", createdAt: "2025-12-01" },
            { id: 2, title: "Teacher Training Workshop", date: "2026-06-20", time: "10:00", location: "FCM Training Hall", description: "Hands-on workshop for new teachers.", capacity: 50, registered: 38, status: "upcoming", createdAt: "2026-01-10" },
            { id: 3, title: "Easter Kids Camp", date: "2026-04-10", time: "08:00", location: "Lake Naivasha Retreat", description: "Three-day kids camp for Easter.", capacity: 100, registered: 100, status: "completed", createdAt: "2026-02-01" }
        ],
        teachingTips: [
            { id: 1, title: "Use Visual Aids Effectively", category: "classroom", description: "Children retain 65% more when visuals are used. Try flashcards, posters, and puppets.", status: "published", createdAt: "2025-09-01" },
            { id: 2, title: "Start with a Question", category: "engagement", description: "Open your lesson with a thought-provoking question to capture attention.", status: "published", createdAt: "2025-09-10" },
            { id: 3, title: "Incorporate Movement", category: "activities", description: "Action songs and role-playing keep restless learners focused.", status: "published", createdAt: "2025-09-20" },
            { id: 4, title: "Pray Before You Plan", category: "spiritual", description: "Seek divine guidance before crafting your lesson outline.", status: "draft", createdAt: "2025-10-01" }
        ]
    };
}

// ========== USERS DATA ==========
function getUsers() {
    return JSON.parse(sessionStorage.getItem('usersDB') || '[]');
}

function setUsers(users) {
    sessionStorage.setItem('usersDB', JSON.stringify(users));
}

// ========== UTILITY: next ID ==========
function nextId(arr) {
    if (!arr.length) return 1;
    return Math.max(...arr.map(i => i.id)) + 1;
}

// ========== UTILITY: format date ==========
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatDateTime(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

// ========== ROLE PROTECTION FOR UI ==========
function hideForEditors(selector) {
    if (!isSystemAdmin()) {
        document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
    }
}

// ========== REUSABLE MEDIA PICKER ==========
function openMediaPicker(onSelectCallback, filterType = 'all') {
    let pickerModal = document.getElementById('mediaPickerModal');
    if (!pickerModal) {
        pickerModal = document.createElement('div');
        pickerModal.id = 'mediaPickerModal';
        pickerModal.className = 'modal-overlay';
        pickerModal.style.zIndex = '9999';
        pickerModal.innerHTML = `
            <div class="modal" style="max-width:600px; width:90%;">
                <div class="modal-header">
                    <h2>Select from Media Library</h2>
                    <button class="modal-close" onclick="closeMediaPicker()">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="display:flex; justify-content:space-between; margin-bottom:1rem; gap:1rem;">
                        <input type="text" id="mpSearch" class="form-control" placeholder="Search files..." style="margin:0;">
                        <select class="form-control" id="mpType" style="width:auto; margin:0; min-width:120px;">
                            <option value="all">All Types</option>
                            <option value="image">Images</option>
                            <option value="video">Videos</option>
                            <option value="audio">Audio</option>
                            <option value="file">Documents</option>
                        </select>
                    </div>
                    <div id="mpGrid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(110px,1fr)); gap:0.75rem; max-height:300px; overflow-y:auto; padding:0.5rem 0;">
                        <!-- Media items -->
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="closeMediaPicker()">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(pickerModal);
        
        document.getElementById('mpSearch').addEventListener('input', () => renderMpGrid());
        document.getElementById('mpType').addEventListener('change', () => renderMpGrid());
    }

    window.mpCallback = (file) => {
        onSelectCallback(file);
        closeMediaPicker();
    };

    pickerModal.classList.add('active');
    document.getElementById('mpType').value = filterType;
    loadMpData();
}

function closeMediaPicker() {
    const modal = document.getElementById('mediaPickerModal');
    if (modal) modal.classList.remove('active');
}

let mpFiles = [];

async function loadMpData() {
    try {
        if (window.API) {
            const local = await API.getMedia();
            let supabaseFiles = [];
            const config = JSON.parse(localStorage.getItem('storageConfig') || '{}');
            // Try initializing Supabase if enabled
            if (config.enableSupabase && config.supabaseUrl && config.supabaseKey) {
                const getSupClient = async () => {
                    if (window.supabase) return window.supabase;
                    return new Promise((resolve) => {
                        const script = document.createElement('script');
                        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
                        script.onload = () => resolve(window.supabase.createClient(config.supabaseUrl, config.supabaseKey));
                        script.onerror = () => resolve(null);
                        document.head.appendChild(script);
                    });
                };
                const client = await getSupClient();
                if (client) {
                    const { data } = await client.storage.from(config.bucketName).list();
                    if (data) {
                        supabaseFiles = data.map(item => {
                            const { data: { publicUrl } } = client.storage.from(config.bucketName).getPublicUrl(item.name);
                            const ext = item.name.split('.').pop().toLowerCase();
                            const type = ['jpg','jpeg','png','gif','webp'].includes(ext) ? 'image' :
                                         ['mp4','webm','mov'].includes(ext) ? 'video' :
                                         ['mp3','wav','ogg'].includes(ext) ? 'audio' : 'file';
                            const k = 1024;
                            const bytes = item.metadata?.size || 0;
                            const sizes = ['B', 'KB', 'MB', 'GB'];
                            const i = bytes === 0 ? 0 : Math.floor(Math.log(bytes) / Math.log(k));
                            const sizeStr = bytes === 0 ? '0 B' : parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
                            return {
                                id: 'sb-' + item.id,
                                name: item.name,
                                type: type,
                                size: sizeStr,
                                url: publicUrl
                            };
                        });
                    }
                }
            }
            mpFiles = [...supabaseFiles, ...local];
        } else {
            mpFiles = getMockMpFiles();
        }
        renderMpGrid();
    } catch (e) {
        console.error(e);
        mpFiles = getMockMpFiles();
        renderMpGrid();
    }
}

function getMockMpFiles() {
    return [
        { id: 1, name: "creation-banner.jpg", type: "image", size: "2.4 MB", url: "/uploads/creation-banner.jpg" },
        { id: 2, name: "jesus-loves-children.jpg", type: "image", size: "1.8 MB", url: "/uploads/jesus-loves-children.jpg" },
        { id: 3, name: "bible-story-intro.mp4", type: "video", size: "45.2 MB", url: "/uploads/bible-story-intro.mp4" },
        { id: 4, name: "worship-song.mp3", type: "audio", size: "5.6 MB", url: "/uploads/worship-song.mp3" },
        { id: 5, name: "starter-kit.pdf", type: "file", size: "3.2 MB", url: "/uploads/starter-kit.pdf" }
    ];
}

function renderMpGrid() {
    const grid = document.getElementById('mpGrid');
    const search = document.getElementById('mpSearch').value.toLowerCase();
    const type = document.getElementById('mpType').value;
    
    let filtered = mpFiles.filter(f => f.name.toLowerCase().includes(search));
    if (type !== 'all') {
        filtered = filtered.filter(f => f.type === type);
    }
    
    if (!filtered.length) {
        grid.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:2rem; color:var(--text-muted);">No files found</div>';
        return;
    }
    
    grid.innerHTML = filtered.map(f => {
        let iconClass = 'fas fa-file-alt';
        if (f.type === 'image') iconClass = 'fas fa-image';
        if (f.type === 'video') iconClass = 'fas fa-film';
        if (f.type === 'audio') iconClass = 'fas fa-music';

        const fStr = JSON.stringify(f).replace(/'/g, "&#39;").replace(/"/g, "&quot;");
        return `
            <div class="media-picker-card" onclick="window.mpCallback(JSON.parse('${fStr}'))" style="cursor:pointer; border: 1px solid var(--border-color); border-radius: var(--radius-md); padding:0.5rem; text-align:center; background:var(--bg-card); transition: all 0.2s ease;">
                <div style="font-size:1.6rem; margin-bottom:0.25rem; color:var(--primary-color);"><i class="${iconClass}"></i></div>
                <div style="font-size:0.75rem; font-weight:700; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${f.name}">${f.name}</div>
                <div style="font-size:0.65rem; color:var(--text-muted);">${f.size}</div>
            </div>
        `;
    }).join('');
}


// ========== ADMIN API HELPER ==========
// Provides a consistent CRUD interface that tries the server API first,
// then falls back to sessionStorage so the admin works offline too.

const AdminAPI = {
    headers() {
        return {
            'Content-Type': 'application/json',
            'x-admin-role': sessionStorage.getItem('adminRole') || 'system_admin'
        };
    },

    async list(endpoint, storageKey) {
        try {
            const res = await fetch(endpoint);
            if (!res.ok) throw new Error('Server error');
            const data = await res.json();
            const items = Array.isArray(data) ? data : (data.studies || data.events || data.subscribers || data);
            // Sync to sessionStorage so dashboard counts stay accurate
            setData(storageKey, items);
            return items;
        } catch {
            return getData(storageKey);
        }
    },

    async create(endpoint, storageKey, payload) {
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: this.headers(),
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Create failed');
            }
            const created = await res.json();
            // Sync local cache
            const items = getData(storageKey);
            items.push(created);
            setData(storageKey, items);
            return created;
        } catch (e) {
            // Offline fallback
            const items = getData(storageKey);
            const entry = { id: nextId(items), ...payload, createdAt: new Date().toISOString().split('T')[0] };
            items.push(entry);
            setData(storageKey, items);
            return entry;
        }
    },

    async update(endpoint, storageKey, id, payload) {
        try {
            const res = await fetch(`${endpoint}/${id}`, {
                method: 'PUT',
                headers: this.headers(),
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Update failed');
            }
            const updated = await res.json();
            const items = getData(storageKey);
            const idx = items.findIndex(i => i.id === parseInt(id));
            if (idx !== -1) items[idx] = updated;
            setData(storageKey, items);
            return updated;
        } catch (e) {
            // Offline fallback
            const items = getData(storageKey);
            const idx = items.findIndex(i => i.id === parseInt(id));
            if (idx !== -1) items[idx] = { ...items[idx], ...payload };
            setData(storageKey, items);
            return items[idx] || null;
        }
    },

    async remove(endpoint, storageKey, id) {
        try {
            const res = await fetch(`${endpoint}/${id}`, {
                method: 'DELETE',
                headers: this.headers()
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || 'Delete failed');
            }
        } catch {
            // Offline fallback — still remove from local cache
        }
        const items = getData(storageKey).filter(i => i.id !== parseInt(id));
        setData(storageKey, items);
    }
};

// ========== MODAL MANAGER ==========
// Centralises open/close/escape/backdrop for all admin modals.
// Usage: ModalManager.open('formModal')  /  ModalManager.close('formModal')

const ModalManager = {
    _stack: [],

    open(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.add('active');
        document.body.style.overflow = 'hidden';
        this._stack.push(id);

        // Close on backdrop click
        el._backdropHandler = (e) => {
            if (e.target === el) this.close(id);
        };
        el.addEventListener('click', el._backdropHandler);
    },

    close(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.remove('active');
        if (el._backdropHandler) {
            el.removeEventListener('click', el._backdropHandler);
            delete el._backdropHandler;
        }
        this._stack = this._stack.filter(i => i !== id);
        if (!this._stack.length) document.body.style.overflow = '';
    },

    closeTop() {
        if (this._stack.length) this.close(this._stack[this._stack.length - 1]);
    }
};

// Global Escape key handler
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') ModalManager.closeTop();
});
