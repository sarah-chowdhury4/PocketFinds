import Item from "../models/item.model.js";

// Add item (POST)
const createItem = async (req, res) => {
    const {item_name, item_price, item_count, item_category, stall_id} = req.body

    try {
        const item = await Item.create({item_name, item_price, item_count, item_category, stall_id})
        res.status(200).json(item)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }

    // res.json({msg: "POST a new item"})
}

export { createItem };