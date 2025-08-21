const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const express = require('express');
const Asset = require('../models/Asset');
const router = express.Router();
router.get('//', async (requestAnimationFrame, res) => {
try {
    const assets = await Asset.findAll ({
        order: [['createdAt', 'DESC' ]],
    });
res.json(assets);
} catch (error) {
    console.error('Error fetching assets:', error);
}
});
router.post('/', async (req, res) => {
    try {
        const {name, category, serialNumber, location, purchasedAt, notes            
        } = req.body;
        const asset = await Asset.create ({
            name,
            category,
            serialNumber,
            location,
            purchasedAt: purchasedAt ? new Date (purchasedAt) : null,
            notes
        });
        res.status(201).json(asset);
    } catch (error) {
        console.error('Error creating asset:', error);

    if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({ error: 'Serial number already exists' });
    } else {
        res.status(500).json({ error: 'Failed to create asset' });
    }
    }
})
module.exports = router;



    

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, serialNumber, location, purchasedAt, notes } = req.body;
        const asset = await Asset.findByPk(id);
        if (!asset) {
            return res.status(404).json({ error: 'Asset not found' });
        }
        await asset.update({
            name,
            category,
            serialNumber,
            location,
            purchasedAt: purchasedAt ? new Date(purchasedAt) : null,
            notes,
        });
        res.json(asset);
    } catch (error) {
        console.error('Error updating asset:', error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ error: 'Serial number already exists' });
        } else {
            res.status(500).json({ error: 'Failed to update asset' });
        }
    }
});

//delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const asset = await Asset.findByPk(id);
        if (!asset) {
            return res.status(404).json.json({ error: 'Asset not found' });
        }
        await asset.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting asset:', error);
        res.status(500).json({ error: 'Failed to delete asset' });
    }
});