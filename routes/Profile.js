const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authmiddleware'); // Adjust the path as necessary
const User = require('../models/User'); // Adjust the path as necessary

const router = express.Router();




// Endpoint to get all users
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send('An error occurred while fetching users');
    }
});

// Endpoint to update user profile
router.put('/update/:userId', authMiddleware, async (req, res) => {
    const userId = req.params.userId;
    const updatedInfo = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        await user.update(updatedInfo);
        await user.reload(); // Reload the user instance to get the updated data
        res.json({
            message: 'User profile updated successfully',
            user: user
        });
    } catch (error) {
        res.status(500).send('An error occurred while updating the user profile');
    }
});

module.exports = router;
