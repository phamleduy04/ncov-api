const router = require('express').Router();
// const { get } = require('../handlers/database');

router.get('/', async (req, res) => {
    return res.json({ error: true, message: 'desperated' });
});

router.get('/:patientid', async (req, res) => {
    return res.json({ error: true, message: 'desperated' });
});

module.exports = router;