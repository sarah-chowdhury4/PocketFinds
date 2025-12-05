import Item from "../models/item.model.js";

// Add item (POST)
const createItem = async (req, res) => {
    const {item_name, item_price, item_count, item_category, stall_id} = req.body;

    try {
        const item = await Item.create({item_name, item_price, item_count, item_category, stall_id});
        res.status(200).json(item);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }

    // res.json({msg: "POST a new item"})
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const item = await Item.findByIdAndUpdate(id, updates, { new: true});
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        return res.status(200).json(item);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to update item' });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByIdAndDelete(id);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        return res.status(200).json(item);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to delete item' });
    }
};

const getMenu = async (req, res) => {
    try {
        const { stall_id } = req.params;
        const items = await Item.find({ stall_id });
        return res.status(200).json(items);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch items' });
    }
};

export { createItem, updateItem, deleteItem, getMenu };