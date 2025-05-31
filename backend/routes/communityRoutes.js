const express = require('express');
const Community = require('../models/Community');
const User = require('../models/User');

const router = express.Router();

// Get all communities
router.get('/', async (req, res) => {
  try {
    const communities = await Community.find();
    res.json(communities);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new community
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  try {
    const community = new Community({ name, description });
    await community.save();
    res.status(201).json(community);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Join a community
router.post('/:id/join', async (req, res) => {
  const { userId } = req.body;
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: 'Community not found' });
    if (!community.members.includes(userId)) {
      community.members.push(userId);
      await community.save();
    }
    res.json(community);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Leave a community
router.post('/:id/leave', async (req, res) => {
  const { userId } = req.body;
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: 'Community not found' });
    community.members = community.members.filter(id => id.toString() !== userId);
    await community.save();
    res.json(community);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 