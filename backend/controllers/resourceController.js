const Resource = require('../models/Resource');

exports.getResources = async (req, res) => {
    try {
        const resources = await Resource.getAll();
        res.json(resources);
    } catch (error) {
        console.error('Error in getResources:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.getResourceById = async (req, res) => {
    try {
        const resource = await Resource.getById(req.params.id);
        if (!resource) return res.status(404).json({ message: 'Resource not found' });
        res.json(resource);
    } catch (error) {
        console.error('Error in getResourceById:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.createResource = async (req, res) => {
    try {
        const id = await Resource.create(req.body);
        res.status(201).json({ id, ...req.body });
    } catch (error) {
        console.error('Error in createResource:', error);
        res.status(500).json({ message: error.message });
    }
};

exports.updateResource = async (req, res) => {
    try {
        await Resource.update(req.params.id, req.body);
        res.json({ message: 'Resource updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        await Resource.delete(req.params.id);
        res.json({ message: 'Resource deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
