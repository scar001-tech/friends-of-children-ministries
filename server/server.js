const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*', // Allow all origins for development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend static files from the root directory
// Since the server is in /server/ folder, we go up one level
app.use(express.static(path.join(__dirname, '..')));

// Import routes
const lessonsRoutes = require('./routes/lessons');
const mediaRoutes = require('./routes/media');

// API Routes
app.use('/api/lessons', lessonsRoutes);
app.use('/api/media', mediaRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Church API Server is running',
        timestamp: new Date().toISOString()
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Friends of Children Ministries API Server',
        version: '1.0.0',
        endpoints: {
            lessons: '/api/lessons',
            media: '/api/media',
            health: '/api/health'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server Error:', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log('='.repeat(50));
        console.log('  Friends of Children Ministries API Server');
        console.log('='.repeat(50));
        console.log(`  Server running on: http://localhost:${PORT}`);
        console.log(`  API Endpoints:`);
        console.log(`    - GET    /api/lessons      - List all lessons`);
        console.log(`    - GET    /api/lessons/:id  - Get lesson by ID`);
        console.log(`    - POST   /api/lessons      - Create new lesson`);
        console.log(`    - PUT    /api/lessons/:id  - Update lesson`);
        console.log(`    - DELETE /api/lessons/:id  - Delete lesson`);
        console.log(`    - GET    /api/media        - List all media`);
        console.log(`    - POST   /api/media        - Upload media file`);
        console.log(`    - DELETE /api/media/:id    - Delete media file`);
        console.log('='.repeat(50));
    });
}

module.exports = app;
