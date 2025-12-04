import express from 'express';
import Stall from '../models/stall.model.js';
import Item from '../models/item.model.js';
import { createItem } from '../controllers/itemController.js';

const router = express.Router();

// POST "/addmenu" to add a menu
router.post('/', createItem)


export default router;