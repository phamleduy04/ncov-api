const router = require('express').Router();
const { get } = require('../handlers/database');

router.get('/', async (req, res) => {
    const data = await get('ncov');
    return res.json(data);
});

router.get('/:patientid', async (req, res) => {
    const { patientid } = req.params;
    let data = await get('ncov');
    data = data.filter(el => el.id == patientid)[0];
    if (data) return res.status(200).json(data);
    return res.status(404).send({ message: 'Not found!' });
});

module.exports = router;