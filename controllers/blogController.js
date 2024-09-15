const Blog = require('../models/Blog');

exports.createPost = async (req, res) => {
  console.log('Inside createPost function');
  const { title, content } = req.body;

  try {
    const newPost = new Blog({ title, content });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error('Error in createPost:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error('Error in getAllBlogs:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (err) {
    console.error('Error in getBlogById:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    await blog.remove();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error in deleteBlog:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
