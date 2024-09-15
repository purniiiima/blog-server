// backend/routes/blogRoutes.js
const express = require('express');
const multer = require('multer');
const { createPost, getAllBlogs, getBlogById, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');


console.log('createPost:', createPost); 

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Blog routes
router.post('/create', upload.single('thumbnail'), createPost);
router.get('/', getAllBlogs); // Public route
router.get('/:id', getBlogById); // Public route
router.delete('/:id', protect, deleteBlog); // Protected route

module.exports = router;
