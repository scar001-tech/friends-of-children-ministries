/**
 * Social Media Widget Module
 * Handles social media content integration and display
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
 */

class SocialMediaWidget {
    constructor() {
        this.refreshInterval = 15 * 60 * 1000; // 15 minutes in milliseconds
        this.intervalId = null;
        this.container = null;
        this.config = {
            platforms: ['twitter', 'facebook', 'instagram'],
            maxPosts: 6,
            autoRefresh: true
        };
    }

    /**
     * Initialize the social media widget
     * @param {HTMLElement} containerElement - Container element for the widget
     * @param {Object} config - Configuration options
     */
    initialize(containerElement, config = {}) {
        this.container = containerElement;
        this.config = { ...this.config, ...config };

        if (!this.container) {
            console.error('Social media widget container not found');
            return;
        }

        // Set up container styling
        this.setupContainer();

        // Initial content load
        this.fetchSocialContent();

        // Set up auto-refresh if enabled
        if (this.config.autoRefresh) {
            this.startAutoRefresh();
        }
    }

    /**
     * Set up container styling and structure
     */
    setupContainer() {
        this.container.className = 'social-media-widget';
        this.container.style.cssText = `
            background: var(--bg-primary, #ffffff);
            border-radius: var(--radius-xl, 16px);
            padding: 1.5rem;
            box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
            border: 1px solid var(--border-color, #e5e7eb);
        `;

        // Add header
        const header = document.createElement('div');
        header.className = 'widget-header';
        header.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid var(--border-color, #e5e7eb);
        `;
        header.innerHTML = `
            <h3 style="margin: 0; color: var(--text-primary, #1f2937); font-size: 1.125rem; font-weight: 600;">
                Latest Updates
            </h3>
            <div class="refresh-indicator" style="display: none; color: var(--text-secondary, #6b7280); font-size: 0.875rem;">
                Refreshing...
            </div>
        `;

        // Add content container
        const content = document.createElement('div');
        content.className = 'widget-content';
        content.style.cssText = `
            min-height: 200px;
        `;

        this.container.appendChild(header);
        this.container.appendChild(content);
    }

    /**
     * Fetch social media content (simulated for demo)
     */
    async fetchSocialContent() {
        const refreshIndicator = this.container.querySelector('.refresh-indicator');
        const contentContainer = this.container.querySelector('.widget-content');

        try {
            // Show loading state
            if (refreshIndicator) {
                refreshIndicator.style.display = 'block';
            }

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Generate mock social media posts
            const posts = this.generateMockPosts();

            // Render posts
            this.renderPosts(posts);

        } catch (error) {
            console.error('Error fetching social content:', error);
            this.handleErrors(error);
        } finally {
            // Hide loading state
            if (refreshIndicator) {
                refreshIndicator.style.display = 'none';
            }
        }
    }

    /**
     * Generate mock social media posts for demonstration
     * @returns {Array} Array of mock post objects
     */
    generateMockPosts() {
        const mockPosts = [
            {
                id: '1',
                platform: 'facebook',
                content: 'Join us this Sunday for our special children\'s service! We\'ll be exploring the story of David and Goliath with interactive activities and songs. 🎵✨',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                mediaUrl: null,
                engagementMetrics: { likes: 24, shares: 8, comments: 12 },
                postUrl: 'https://facebook.com/friendsofchildrenministries/posts/1'
            },
            {
                id: '2',
                platform: 'instagram',
                content: 'Beautiful artwork from our Sunday school class today! The children created these amazing drawings while learning about God\'s creation. 🎨🌟',
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
                mediaUrl: 'lesson-faith.png',
                engagementMetrics: { likes: 45, shares: 15, comments: 8 },
                postUrl: 'https://instagram.com/p/friendsofchildren1'
            },
            {
                id: '3',
                platform: 'twitter',
                content: 'New lesson materials now available! Check out our latest Bible study resources for ages 6-12. Perfect for Sunday school teachers and homeschool families. 📚',
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
                mediaUrl: null,
                engagementMetrics: { likes: 18, shares: 22, comments: 5 },
                postUrl: 'https://twitter.com/friendschildren/status/1'
            },
            {
                id: '4',
                platform: 'facebook',
                content: 'Thank you to all the volunteers who helped with our community outreach event! Together we served over 100 families. God is good! 🙏❤️',
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
                mediaUrl: null,
                engagementMetrics: { likes: 67, shares: 31, comments: 28 },
                postUrl: 'https://facebook.com/friendsofchildrenministries/posts/2'
            }
        ];

        return mockPosts.slice(0, this.config.maxPosts);
    }

    /**
     * Render social media posts
     * @param {Array} posts - Array of post objects
     */
    renderPosts(posts) {
        const contentContainer = this.container.querySelector('.widget-content');
        
        if (!posts || posts.length === 0) {
            this.showFallbackContent();
            return;
        }

        const postsHTML = posts.map(post => this.createPostHTML(post)).join('');
        contentContainer.innerHTML = `
            <div class="social-posts" style="display: flex; flex-direction: column; gap: 1rem;">
                ${postsHTML}
            </div>
        `;
    }

    /**
     * Create HTML for a single social media post
     * @param {Object} post - Post object
     * @returns {string} HTML string
     */
    createPostHTML(post) {
        const platformIcon = this.getPlatformIcon(post.platform);
        const timeAgo = this.getTimeAgo(post.timestamp);
        const mediaHTML = post.mediaUrl ? `
            <div style="margin: 0.75rem 0;">
                <img src="${post.mediaUrl}" alt="Social media post image" 
                     style="width: 100%; max-width: 200px; height: auto; border-radius: 8px; object-fit: cover;">
            </div>
        ` : '';

        return `
            <div class="social-post" style="
                padding: 1rem;
                background: var(--bg-secondary, #f9fafb);
                border-radius: var(--radius-lg, 12px);
                border: 1px solid var(--border-color, #e5e7eb);
                transition: all 0.2s ease;
            " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 16px rgba(0,0,0,0.1)'" 
               onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
                    <span style="font-size: 1.25rem;">${platformIcon}</span>
                    <span style="font-weight: 600; color: var(--text-primary, #1f2937); text-transform: capitalize;">
                        ${post.platform}
                    </span>
                    <span style="color: var(--text-secondary, #6b7280); font-size: 0.875rem; margin-left: auto;">
                        ${timeAgo}
                    </span>
                </div>
                
                <p style="margin: 0 0 0.75rem 0; color: var(--text-primary, #1f2937); line-height: 1.5; font-size: 0.9rem;">
                    ${post.content}
                </p>
                
                ${mediaHTML}
                
                <div style="display: flex; align-items: center; gap: 1rem; margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border-color, #e5e7eb);">
                    <span style="color: var(--text-secondary, #6b7280); font-size: 0.8rem;">
                        ❤️ ${post.engagementMetrics.likes}
                    </span>
                    <span style="color: var(--text-secondary, #6b7280); font-size: 0.8rem;">
                        🔄 ${post.engagementMetrics.shares}
                    </span>
                    <span style="color: var(--text-secondary, #6b7280); font-size: 0.8rem;">
                        💬 ${post.engagementMetrics.comments}
                    </span>
                    <a href="${post.postUrl}" target="_blank" rel="noopener noreferrer" 
                       style="margin-left: auto; color: var(--primary-color, #4a6d8c); text-decoration: none; font-size: 0.8rem; font-weight: 500;"
                       onmouseover="this.style.textDecoration='underline'"
                       onmouseout="this.style.textDecoration='none'">
                        View Post →
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Get platform icon emoji
     * @param {string} platform - Platform name
     * @returns {string} Platform icon
     */
    getPlatformIcon(platform) {
        const icons = {
            facebook: '📘',
            instagram: '📷',
            twitter: '🐦',
            youtube: '📺'
        };
        return icons[platform] || '📱';
    }

    /**
     * Get time ago string
     * @param {Date} timestamp - Post timestamp
     * @returns {string} Time ago string
     */
    getTimeAgo(timestamp) {
        const now = new Date();
        const diffMs = now - timestamp;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) {
            return `${diffDays}d ago`;
        } else if (diffHours > 0) {
            return `${diffHours}h ago`;
        } else {
            const diffMinutes = Math.floor(diffMs / (1000 * 60));
            return `${Math.max(1, diffMinutes)}m ago`;
        }
    }

    /**
     * Show fallback content when social media is unavailable
     */
    showFallbackContent() {
        const contentContainer = this.container.querySelector('.widget-content');
        contentContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-secondary, #6b7280);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📱</div>
                <h4 style="margin: 0 0 0.5rem 0; color: var(--text-primary, #1f2937);">Stay Connected</h4>
                <p style="margin: 0; font-size: 0.9rem; line-height: 1.5;">
                    Follow us on social media for the latest updates and announcements from Friends of Children Ministries.
                </p>
                <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 0.5rem;">
                    <a href="#" style="color: var(--primary-color, #4a6d8c); text-decoration: none; font-size: 0.875rem;">Facebook</a>
                    <span style="color: var(--text-secondary, #6b7280);">•</span>
                    <a href="#" style="color: var(--primary-color, #4a6d8c); text-decoration: none; font-size: 0.875rem;">Instagram</a>
                    <span style="color: var(--text-secondary, #6b7280);">•</span>
                    <a href="#" style="color: var(--primary-color, #4a6d8c); text-decoration: none; font-size: 0.875rem;">Twitter</a>
                </div>
            </div>
        `;
    }

    /**
     * Handle errors in social media content fetching
     * @param {Error} error - Error object
     */
    handleErrors(error) {
        console.error('Social media widget error:', error);
        this.showFallbackContent();
    }

    /**
     * Start auto-refresh functionality
     */
    startAutoRefresh() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        this.intervalId = setInterval(() => {
            this.refreshContent();
        }, this.refreshInterval);
    }

    /**
     * Stop auto-refresh functionality
     */
    stopAutoRefresh() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    /**
     * Manually refresh content
     */
    refreshContent() {
        this.fetchSocialContent();
    }

    /**
     * Destroy the widget and clean up resources
     */
    destroy() {
        this.stopAutoRefresh();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Export for use in other modules
window.SocialMediaWidget = SocialMediaWidget;