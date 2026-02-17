const Issuance = require('../models/Issuance');

exports.getIssuances = async (req, res) => {
    try {
        const issuances = await Issuance.getAll();
        res.json(issuances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.issueResource = async (req, res) => {
    const { student_id, resource_id } = req.body;
    try {
        await Issuance.issueResource(student_id, resource_id);
        res.status(201).json({ message: 'Resource issued successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.returnResource = async (req, res) => {
    try {
        await Issuance.returnResource(req.params.id);
        res.json({ message: 'Resource returned successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
