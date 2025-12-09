import express from 'express';
import Stall from '../models/stall.model.js';
import Item from '../models/item.model.js';
import { createItem, updateItem, deleteItem, getMenu } from '../controllers/itemController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// POST, PUT, DELETE routes for stall owners to manage menu items
router.post('/', requireAuth, requireRole('stall owner'), createItem);
router.put('/:id', requireAuth, requireRole('stall owner'), updateItem);
router.delete('/:id', requireAuth, requireRole('stall owner'), deleteItem);

// GET "/menu/:stall_id" to get menu by stall ID
router.get('/:stall_id', getMenu);

export default router;
