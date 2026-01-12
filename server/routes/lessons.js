const express = require('express');
const router = express.Router();
const db = require('../database/db');

// GET /api/lessons - Get all lessons with optional search and filter
router.get('/', (req, res) => {
    try {
        const { search, category } = req.query;
        const lessons = db.lessons.getAll({ search, category });
        res.json(lessons);
    } catch (error) {
        console.error('Error fetching lessons:', error);
        res.status(500).json({ error: 'Failed to fetch lessons' });
    }
});

// GET /api/lessons/:id - Get single lesson by ID
router.get('/:id', (req, res) => {
    try {
        const lesson = db.lessons.getById(req.params.id);

        if (!lesson) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        res.json(lesson);
    } catch (error) {
        console.error('Error fetching lesson:', error);
        res.status(500).json({ error: 'Failed to fetch lesson' });
    }
});

// POST /api/lessons - Create new lesson
router.post('/', (req, res) => {
    try {
        const {
            title, scripture, category, date, duration, ageGroup,
            description, overview, objectives, lessonContent, materials,
            discussionQuestions, articleTitle, articleAuthor, articleDate,
            articleContent, articleLink, videoUrl, audioUrl, status, link, gradient
        } = req.body;

        if (!title || !scripture || !category) {
            return res.status(400).json({ error: 'Title, scripture, and category are required' });
        }

        const lessonData = {
            title, scripture, category,
            date: date || null,
            duration: duration || null,
            ageGroup: ageGroup || null,
            description: description || null,
            overview: overview || null,
            objectives: objectives || null,
            lessonContent: lessonContent || null,
            materials: materials || null,
            discussionQuestions: discussionQuestions || null,
            articleTitle: articleTitle || null,
            articleAuthor: articleAuthor || null,
            articleDate: articleDate || null,
            articleContent: articleContent || null,
            articleLink: articleLink || null,
            videoUrl: videoUrl || null,
            audioUrl: audioUrl || null,
            status: status || 'published',
            link: link || null,
            gradient: gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        };

        const newLesson = db.lessons.create(lessonData);
        res.status(201).json(newLesson);
    } catch (error) {
        console.error('Error creating lesson:', error);
        res.status(500).json({ error: 'Failed to create lesson' });
    }
});

// PUT /api/lessons/:id - Update existing lesson
router.put('/:id', (req, res) => {
    try {
        const lessonId = req.params.id;

        // Check if lesson exists
        const existing = db.lessons.getById(lessonId);
        if (!existing) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        const updatedLesson = db.lessons.update(lessonId, req.body);
        res.json(updatedLesson);
    } catch (error) {
        console.error('Error updating lesson:', error);
        res.status(500).json({ error: 'Failed to update lesson' });
    }
});

// DELETE /api/lessons/:id - Delete lesson
router.delete('/:id', (req, res) => {
    try {
        const lessonId = req.params.id;

        const deleted = db.lessons.delete(lessonId);
        if (!deleted) {
            return res.status(404).json({ error: 'Lesson not found' });
        }

        res.json({ message: 'Lesson deleted successfully', id: lessonId });
    } catch (error) {
        console.error('Error deleting lesson:', error);
        res.status(500).json({ error: 'Failed to delete lesson' });
    }
});

module.exports = router;
