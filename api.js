// Friends of Children Ministries - API Client
// This module handles all communication with the backend server

const API = {
    // Base URL for the API server
    // Base URL for the API server
    baseUrl: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api'
        : '/api',

    // ============================================
    // LESSONS API
    // ============================================

    /**
     * Get all lessons with optional search and category filter
     * @param {string} search - Search term (optional)
     * @param {string} category - Category filter (optional)
     * @returns {Promise<Array>} Array of lessons
     */
    async getLessons(search = '', category = 'all') {
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (category && category !== 'all') params.append('category', category);

            const url = `${this.baseUrl}/lessons${params.toString() ? '?' + params.toString() : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching lessons:', error);
            throw error;
        }
    },

    /**
     * Get a single lesson by ID
     * @param {number} id - Lesson ID
     * @returns {Promise<Object>} Lesson object
     */
    async getLesson(id) {
        try {
            const response = await fetch(`${this.baseUrl}/lessons/${id}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching lesson:', error);
            throw error;
        }
    },

    /**
     * Create a new lesson
     * @param {Object} lessonData - Lesson data object
     * @returns {Promise<Object>} Created lesson
     */
    async createLesson(lessonData) {
        try {
            const response = await fetch(`${this.baseUrl}/lessons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lessonData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating lesson:', error);
            throw error;
        }
    },

    /**
     * Update an existing lesson
     * @param {number} id - Lesson ID
     * @param {Object} lessonData - Updated lesson data
     * @returns {Promise<Object>} Updated lesson
     */
    async updateLesson(id, lessonData) {
        try {
            const response = await fetch(`${this.baseUrl}/lessons/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lessonData)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating lesson:', error);
            throw error;
        }
    },

    /**
     * Delete a lesson
     * @param {number} id - Lesson ID
     * @returns {Promise<Object>} Deletion confirmation
     */
    async deleteLesson(id) {
        try {
            const response = await fetch(`${this.baseUrl}/lessons/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting lesson:', error);
            throw error;
        }
    },

    // ============================================
    // MEDIA API
    // ============================================

    /**
     * Get all media files with optional type filter
     * @param {string} type - Media type filter ('image', 'video', 'audio', 'all')
     * @returns {Promise<Array>} Array of media files
     */
    async getMedia(type = 'all') {
        try {
            const params = new URLSearchParams();
            if (type && type !== 'all') params.append('type', type);

            const url = `${this.baseUrl}/media${params.toString() ? '?' + params.toString() : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching media:', error);
            throw error;
        }
    },

    /**
     * Upload a new media file
     * @param {File} file - File to upload
     * @returns {Promise<Object>} Created media entry
     */
    async uploadMedia(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${this.baseUrl}/media`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error uploading media:', error);
            throw error;
        }
    },

    /**
     * Delete a media file
     * @param {number} id - Media file ID
     * @returns {Promise<Object>} Deletion confirmation
     */
    async deleteMedia(id) {
        try {
            const response = await fetch(`${this.baseUrl}/media/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting media:', error);
            throw error;
        }
    },

    // ============================================
    // UTILITY METHODS
    // ============================================

    /**
     * Check if the API server is running
     * @returns {Promise<boolean>} True if server is running
     */
    async checkHealth() {
        try {
            const response = await fetch(`${this.baseUrl}/health`);
            return response.ok;
        } catch (error) {
            console.error('API server is not running:', error);
            return false;
        }
    }
};

// Make API available globally
window.API = API;
