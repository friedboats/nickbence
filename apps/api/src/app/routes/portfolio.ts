const express = require('express');
const PortfolioItem = require('../models/PortfolioItem');
const router = express.Router();

// GET - All portfolio items
router.get('/', async (req, res) => {
  //res.json('hi my name is Eleanor.');
  try {
    const portfolio = await PortfolioItem.find().lean();
    res.status(200).json(portfolio);
  } catch (err) {
    res.sendStatus(404);
  }
});

// GET - One portfolio item
router.get('/:id', async (req, res) => {
  try {
    const portfolioItem = await PortfolioItem.findById(req.params.id);
    res.status(200).json(portfolioItem);
  } catch (err) {
    res.sendStatus(404);
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
    res.status(201).json(portfolioItem);
  } catch (err) {
    res.json({ message: err });
  }
});

// UPDATE - One portfolio item
router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await PortfolioItem.findByIdAndUpdate(
      id,
      { title: req.body.title },
      (err) => {
        if (err) {
          res.json({ message: err });
        } else {
          res.sendStatus(204);
        }
      }
    );
  } catch (err) {
    res.json({ message: err });
  }
});

// DELETE - One portfolio item
router.delete('/:id', async (req, res) => {
  try {
    await PortfolioItem.remove({
      _id: req.params.id,
    });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
});

export default router;
