import express from 'express';
import Stall from '../models/stall.model.js';
import Item from '../models/item.model.js';

const router = express.Router();
// // GET "/menu" to get menu items
// router.get('/', (req, res) => {
//     res.json({msg: "GET all menu items"})
// })

// // GET one menu item
// router.get('/:id', (req, res) => {
//     res.json({msg: "GET single menu item"})
// })

// POST "/addmenu" to add a menu
router.post('/', async (req, res) => {
    const {item_name, item_price, item_count, item_category, stall_id} = req.body

    try {
        const item = await Item.create({item_name, item_price, item_count, item_category, stall_id})
        res.status(200).json(item)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

    // res.json({msg: "POST a new item"})
})

// // DELETE "/menu/:id" to delete item
// router.delete('/:id', (req, res) => {
//     res.json({msg: "DELETE item"})
// })

// // PATCH "/menu/:id" to update menu
// router.patch('/:id', (req, res) => {
//     res.json({msg: "UPDATE item"})
// })
export default router;