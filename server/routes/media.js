const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../database/db');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Create unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    },
    fileFilter: (req, file, cb) => {
        // Allow images, videos, and audio
        const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm|mov|mp3|wav|ogg/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only image, video, and audio files are allowed!'));
    }
});

// Helper function to determine file type
function getFileType(mimetype) {
    if (mimetype.startsWith('image')) return 'image';
    if (mimetype.startsWith('video')) return 'video';
    if (mimetype.startsWith('audio')) return 'audio';
    return 'file';
}

// Helper function to get icon based on type
function getFileIcon(type) {
    switch (type) {
        case 'image': return 'IMG';
        case 'video': return 'VID';
        case 'audio': return 'AUD';
        default: return 'FILE';
    }
}

// Helper function to format file size
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// GET /api/media - Get all media files with optional filter
router.get('/', (req, res) => {
    try {
        const { type } = req.query;
        const media = db.media.getAll({ type });
        res.json(media);
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ error: 'Failed to fetch media files' });
    }
});

// GET /api/media/:id - Get single media file by ID
router.get('/:id', (req, res) => {
    try {
        const media = db.media.getById(req.params.id);

        if (!media) {
            return res.status(404).json({ error: 'Media file not found' });
        }

        res.json(media);
    } catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({ error: 'Failed to fetch media file' });
    }
});

// POST /api/media - Upload new media file
router.post('/', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.file;
        const type = getFileType(file.mimetype);
        const icon = getFileIcon(type);
        const size = formatFileSize(file.size);
        const date = new Date().toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const mediaData = {
            name: file.originalname,
            type: type,
            size: size,
            date: date,
            icon: icon,
            url: `/uploads/${file.filename}`
        };

        const newMedia = db.media.create(mediaData);
        res.status(201).json(newMedia);
    } catch (error) {
        console.error('Error uploading media:', error);
        res.status(500).json({ error: 'Failed to upload media file' });
    }
});

// DELETE /api/media/:id - Delete media file
router.delete('/:id', (req, res) => {
    try {
        const mediaId = req.params.id;

        // Get the file info before deleting
        const media = db.media.getById(mediaId);
        if (!media) {
            return res.status(404).json({ error: 'Media file not found' });
        }

        // Try to delete the physical file (if it exists in uploads)
        if (media.url && media.url.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, '..', media.url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        // Delete from database
        db.media.delete(mediaId);
        res.json({ message: 'Media file deleted successfully', id: mediaId });
    } catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).json({ error: 'Failed to delete media file' });
    }
});

module.exports = router;
