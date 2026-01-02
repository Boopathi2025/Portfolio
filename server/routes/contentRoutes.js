const express = require('express');
const router = express.Router();
const { fetchOne, fetchAll, execute } = require('../database');
const { authenticateToken } = require('../middleware/authMiddleware');

// --- Public Routes ---

router.get('/hero', async (req, res) => {
    try {
        const hero = await fetchOne('SELECT * FROM hero LIMIT 1');
        res.json(hero || {});
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/about', async (req, res) => {
    try {
        const about = await fetchOne('SELECT * FROM about LIMIT 1');
        res.json(about || {});
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/projects', async (req, res) => {
    try {
        const projects = await fetchAll('SELECT * FROM projects ORDER BY created_at DESC');
        res.json(projects);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/skills', async (req, res) => {
    try {
        const skills = await fetchAll('SELECT * FROM skills');
        res.json(skills);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/logs', async (req, res) => {
    try {
        const logs = await fetchAll('SELECT * FROM logs ORDER BY date DESC');
        res.json(logs);
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// --- Protected Routes (Admin Only) ---

// Hero - Upsert
router.put('/hero', authenticateToken, async (req, res) => {
    const { title, subtitle, image_url } = req.body;
    try {
        const existing = await fetchOne('SELECT id FROM hero LIMIT 1');
        if (existing) {
            await execute('UPDATE hero SET title = ?, subtitle = ?, image_url = ? WHERE id = ?', [title, subtitle, image_url, existing.id]);
        } else {
            await execute('INSERT INTO hero (title, subtitle, image_url) VALUES (?, ?, ?)', [title, subtitle, image_url]);
        }
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// About - Upsert
router.put('/about', authenticateToken, async (req, res) => {
    const { content } = req.body;
    try {
        const existing = await fetchOne('SELECT id FROM about LIMIT 1');
        if (existing) {
            await execute('UPDATE about SET content = ? WHERE id = ?', [content, existing.id]);
        } else {
            await execute('INSERT INTO about (content) VALUES (?)', [content]);
        }
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Projects
router.post('/projects', authenticateToken, async (req, res) => {
    const { title, description, tech_stack, link, image_url } = req.body;
    try {
        await execute(
            'INSERT INTO projects (title, description, tech_stack, link, image_url) VALUES (?, ?, ?, ?, ?)',
            [title, description, tech_stack, link, image_url]
        );
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/projects/:id', authenticateToken, async (req, res) => {
    const { title, description, tech_stack, link, image_url } = req.body;
    const { id } = req.params;
    try {
        await execute(
            'UPDATE projects SET title = ?, description = ?, tech_stack = ?, link = ?, image_url = ? WHERE id = ?',
            [title, description, tech_stack, link, image_url, id]
        );
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/projects/:id', authenticateToken, async (req, res) => {
    try {
        await execute('DELETE FROM projects WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Skills
router.post('/skills', authenticateToken, async (req, res) => {
    const { category, name, level } = req.body;
    try {
        await execute('INSERT INTO skills (category, name, level) VALUES (?, ?, ?)', [category, name, level]);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/skills/:id', authenticateToken, async (req, res) => {
    try {
        await execute('DELETE FROM skills WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

// Logs
router.post('/logs', authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    try {
        await execute('INSERT INTO logs (title, content) VALUES (?, ?)', [title, content]);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.put('/logs/:id', authenticateToken, async (req, res) => {
    const { title, content } = req.body;
    try {
        await execute('UPDATE logs SET title = ?, content = ? WHERE id = ?', [title, content, req.params.id]);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

router.delete('/logs/:id', authenticateToken, async (req, res) => {
    try {
        await execute('DELETE FROM logs WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (e) { res.status(500).json({ error: e.message }); }
});

module.exports = router;
