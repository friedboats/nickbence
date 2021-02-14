const express = require('express');
const PortfolioItem = require('../models/PortfolioItem');
const router = express.Router();

// GET - All portfolio items
router.get('/', async (req, res) => {
  try {
    const portfolio = await PortfolioItem.find();
    res.json(portfolio);
  } catch (err) {
    res.json({ message: err });
  }
});

// GET - One portfolio item
router.get('/:id', async (req, res) => {
  try {
    const portfolioItem = await PortfolioItem.findById(req.params.id);
    res.json(portfolioItem);
  } catch (err) {
    res.json({ message: err });
  }
});

// POST - Create portfolio item
router.post('/', async (req, res) => {
  try {
    // Create body from model
    const portfolioItem = new PortfolioItem({
      title: req.body.title,
      description: req.body.description,
    });
    await portfolioItem.save();
    // TODO: Might need to add status code here
    //res.status(200).json(data);
    res.json(portfolioItem);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE - One portfolio item
router.patch('/:id', async (req, res) => {
  try {
    const updatedPortfolioItem = await PortfolioItem.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title },
      { new: true }
    );
    res.json(updatedPortfolioItem);
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE - One portfolio item
router.delete('/:id', async (req, res) => {
  try {
    const removedPortfolioItem = await PortfolioItem.remove({
      _id: req.params.id,
    });
    res.json(removedPortfolioItem);
  } catch (err) {
    res.json({ message: err });
  }
  res.send('Delete one portfolio item');
});

export default router;
