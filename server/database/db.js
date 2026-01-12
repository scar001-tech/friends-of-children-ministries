const fs = require('fs');
const path = require('path');

// Database file paths
const dbDir = __dirname;
const lessonsFile = path.join(dbDir, 'lessons.json');
const mediaFile = path.join(dbDir, 'media.json');

// Initialize database files if they don't exist
function initializeDatabase() {
    if (!fs.existsSync(lessonsFile)) {
        fs.writeFileSync(lessonsFile, JSON.stringify([], null, 2));
        console.log('Created lessons.json');
    }

    if (!fs.existsSync(mediaFile)) {
        fs.writeFileSync(mediaFile, JSON.stringify([], null, 2));
        console.log('Created media.json');
    }

    console.log('Database initialized successfully');
}

// Read data from JSON file
function readData(file) {
    try {
        const data = fs.readFileSync(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${file}:`, error);
        return [];
    }
}

// Write data to JSON file
function writeData(file, data) {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing ${file}:`, error);
        return false;
    }
}

// Database wrapper with SQL-like API
const db = {
    // Lessons operations
    lessons: {
        getAll: (filter = {}) => {
            const lessons = readData(lessonsFile);
            let filtered = lessons;

            // Apply category filter
            if (filter.category && filter.category !== 'all') {
                filtered = filtered.filter(l => l.category === filter.category);
            }

            // Apply search filter
            if (filter.search) {
                const search = filter.search.toLowerCase();
                filtered = filtered.filter(l =>
                    l.title.toLowerCase().includes(search) ||
                    l.scripture.toLowerCase().includes(search) ||
                    (l.description && l.description.toLowerCase().includes(search)) ||
                    l.category.toLowerCase().includes(search)
                );
            }

            return filtered;
        },

        getById: (id) => {
            const lessons = readData(lessonsFile);
            return lessons.find(l => l.id === parseInt(id));
        },

        create: (lessonData) => {
            const lessons = readData(lessonsFile);
            const newId = lessons.length > 0 ? Math.max(...lessons.map(l => l.id)) + 1 : 1;

            const newLesson = {
                id: newId,
                ...lessonData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            lessons.push(newLesson);
            writeData(lessonsFile, lessons);
            return newLesson;
        },

        update: (id, lessonData) => {
            const lessons = readData(lessonsFile);
            const index = lessons.findIndex(l => l.id === parseInt(id));

            if (index === -1) return null;

            lessons[index] = {
                ...lessons[index],
                ...lessonData,
                id: parseInt(id), // Ensure ID doesn't change
                updatedAt: new Date().toISOString()
            };

            writeData(lessonsFile, lessons);
            return lessons[index];
        },

        delete: (id) => {
            const lessons = readData(lessonsFile);
            const filtered = lessons.filter(l => l.id !== parseInt(id));

            if (filtered.length === lessons.length) return false;

            writeData(lessonsFile, filtered);
            return true;
        }
    },

    // Media operations
    media: {
        getAll: (filter = {}) => {
            const media = readData(mediaFile);

            if (filter.type && filter.type !== 'all') {
                return media.filter(m => m.type === filter.type);
            }

            return media;
        },

        getById: (id) => {
            const media = readData(mediaFile);
            return media.find(m => m.id === parseInt(id));
        },

        create: (mediaData) => {
            const media = readData(mediaFile);
            const newId = media.length > 0 ? Math.max(...media.map(m => m.id)) + 1 : 1;

            const newMedia = {
                id: newId,
                ...mediaData,
                createdAt: new Date().toISOString()
            };

            media.push(newMedia);
            writeData(mediaFile, media);
            return newMedia;
        },

        delete: (id) => {
            const media = readData(mediaFile);
            const filtered = media.filter(m => m.id !== parseInt(id));

            if (filtered.length === media.length) return false;

            writeData(mediaFile, filtered);
            return true;
        }
    }
};

// Initialize on module load
initializeDatabase();

module.exports = db;
