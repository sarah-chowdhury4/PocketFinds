import express from 'express';
import { 
    addBookmark, 
    removeBookmark, 
    getUserBookmarks,
    toggleNotifications 
} from '../controllers/bookmarkController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getUserBookmarks);
router.post('/', addBookmark);
router.delete('/:stall_id', removeBookmark);
router.put('/notifications', toggleNotifications);

export default router;
