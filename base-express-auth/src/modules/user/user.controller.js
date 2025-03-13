import mongoose from 'mongoose';
import User from './user.module.js';

/** 🔹 Create a New User */
export function createUser(req, res) {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,  // ⚠️ In production, hash the password!
    });

    return user
        .save()
        .then((newUser) => {
            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                user: newUser,
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

/** 🔹 Get All Users */
export function getAllUsers(req, res) {
    User.find()
        .select('_id name email createdAt')
        .then((users) => {
            return res.status(200).json({
                success: true,
                message: 'List of all users',
                users: users,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}

/** 🔹 Get a Single User by ID */
export function getUserById(req, res) {
    const userId = req.params.userId;

    User.findById(userId)
        .select('_id name email createdAt')
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'User found',
                user: user,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}

/** 🔹 Update a User */
export function updateUser(req, res) {
    const userId = req.params.userId;

    User.findByIdAndUpdate(
        userId,
        { $set: req.body }, // ⚠️ Only update fields provided in req.body
        { new: true, runValidators: true }
    )
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
                user: updatedUser,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}

/** 🔹 Delete a User */
export function deleteUser(req, res) {
    const userId = req.params.userId;

    User.findByIdAndDelete(userId)
        .then((deletedUser) => {
            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully',
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        });
}
