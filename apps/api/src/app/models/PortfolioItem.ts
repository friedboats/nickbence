const mongoose = require('mongoose');

const PortfolioItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imgPath: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('PortfolioItem', PortfolioItemSchema);
