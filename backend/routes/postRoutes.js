const express = require('express');
const Post = require('../models/Post');
const Community = require('../models/Community');
const User = require('../models/User');

const router = express.Router();

// Get all posts for a community
router.get('/community/:communityId', async (req, res) => {
  try {
    const posts = await Post.find({ community: req.params.communityId })
      .populate('user', 'firstName lastName')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a post in a community
router.post('/', async (req, res) => {
  const { communityId, userId, title, content } = req.body;
  try {
    const post = new Post({
      community: communityId,
      user: userId,
      title,
      content,
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upvote a post
router.post('/:id/upvote', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.upvotes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Downvote a post
router.post('/:id/downvote', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.downvotes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 