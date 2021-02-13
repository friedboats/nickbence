const express = require('express');
const router = express.Router();

// Get all portfolio items
router.get('/', (req, res) => {
  res.send('Get all portfolio items');
});

// Get one portfolio item
router.get('/:id', (req, res) => {
  res.send('Get one portfolio item');
});

// Create portfolio item
router.post('/', (req, res) => {
  res.send('Post one portfolio item');
});

// Update portfolio item
router.patch('/', (req, res) => {
  res.send('Update one portfolio item');
});

// Delete portfolio item
router.delete('/:id', (req, res) => {
  res.send('Delete one portfolio item');
});

// POST
/* router.post('/', (req, res) => {
  // Create body from model
  const portfolioItem = new PortfolioItem({
    title: req.body.title,
    description: req.body.description,
  });

  portfolioItem
    .save()
    .then((data) => {
      console.log('hi');
      // TODO: Might need to add status code here
      //res.status(200).json(data);

      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      //res.json({ message: err });
    });
});
 */
export default router;
