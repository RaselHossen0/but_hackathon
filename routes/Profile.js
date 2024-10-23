const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authmiddleware'); // Adjust the path as necessary
const User = require('../models/User'); // Adjust the path as necessary
const multer = require('multer');

const router = express.Router();




// Endpoint to get all users
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Exclude the password field
        });
        res.json(users);
    } catch (error) {
        res.status(500).send('An error occurred while fetching users');
    }
});

// Endpoint to update user profile
const upload = multer({ dest: 'uploads/' }); // Configure multer to save files to the 'uploads' directory

router.put('/update/:userId', authMiddleware, upload.single('image'), async (req, res) => {
    const userId = req.params.userId;
    const updatedInfo = req.body;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if an image is being updated
        if (req.file) {
            updatedInfo.image = req.file.path; // Multer saves the file and adds the path to req.file
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
