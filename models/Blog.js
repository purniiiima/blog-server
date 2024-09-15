const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Uncategorized' },
  description: { type: String, required: true },
  thumbnail: { type: String }, // Thumbnail image file path
  name: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blog', BlogSchema);
