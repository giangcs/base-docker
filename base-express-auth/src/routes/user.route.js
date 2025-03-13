import express from 'express';
const router = express.Router();
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
} from '../modules/user/user.controller.js';

// router.post('/', createUser);
router.get('/', getAllUsers);
// router.get('/:userId', getUserById);
// router.put('/:userId', updateUser);
// router.delete('/:userId', deleteUser);

export default router;