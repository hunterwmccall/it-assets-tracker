const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const express = require('express');
const Asset = require('../models/Asset');
const router = exprress.Router();
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



    

