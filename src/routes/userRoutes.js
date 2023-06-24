import express from 'express';
import { getUserInfo } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Me route
router.get('/me', authenticate, getUserInfo);

export default router;
