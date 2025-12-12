import Stall from '../models/stall.model.js';

// Create a new stall (only for stall owners)
const createStall = async (req, res) => {
  try {
    const { stall_name, stall_location, discount, offer } = req.body;
    const owner_id = req.user.uid;

    // Check if owner already has a stall
    const existingStall = await Stall.findOne({ owner_id });
    if (existingStall) {
      return res.status(400).json({ error: 'Stall owner can only have one stall' });
    }

    const stall = await Stall.create({
      owner_id,
      stall_name,
      stall_location,
      discount,
      offer,
      items: [],
    });

    res.status(201).json({ success: true, data: stall });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all stalls with filtering and search
const getAllStalls = async (req, res) => {
  try {
    const { search, category, sortBy } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { stall_name: { $regex: search, $options: 'i' } },
        { stall_location: { $regex: search, $options: 'i' } },
      ];
    }

    let stalls = await Stall.find(filter).lean();

    // Sort
    if (sortBy === 'rating') {
      stalls = stalls.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'reviews') {
      stalls = stalls.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    res.status(200).json({ success: true, data: stalls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single stall by ID
const getStallById = async (req, res) => {
  try {
    const { id } = req.params;
    const stall = await Stall.findById(id);

    if (!stall) {
      return res.status(404).json({ error: 'Stall not found' });
    }

    res.status(200).json({ success: true, data: stall });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get stall by owner ID
const getStallByOwner = async (req, res) => {
  try {
    const owner_id = req.user.uid;
    const stall = await Stall.findOne({ owner_id });

    if (!stall) {
      return res.status(404).json({ error: 'Stall not found for this owner' });
    }

    res.status(200).json({ success: true, data: stall });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update stall
const updateStall = async (req, res) => {
  try {
    const { id } = req.params;
    const owner_id = req.user.uid;

    const stall = await Stall.findById(id);
    if (!stall) {
      return res.status(404).json({ error: 'Stall not found' });
    }

    // Check ownership
    if (stall.owner_id.toString() !== owner_id) {
      return res.status(403).json({ error: 'Not authorized to update this stall' });
    }

    const updated = await Stall.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete stall
const deleteStall = async (req, res) => {
  try {
    const { id } = req.params;
    const owner_id = req.user.uid;

    const stall = await Stall.findById(id);
    if (!stall) {
      return res.status(404).json({ error: 'Stall not found' });
    }

    // Check ownership
    if (stall.owner_id.toString() !== owner_id) {
      return res.status(403).json({ error: 'Not authorized to delete this stall' });
    }

    await Stall.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Stall deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { createStall, getAllStalls, getStallById, getStallByOwner, updateStall, deleteStall };
