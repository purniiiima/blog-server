const Blog = require('../models/Blog');

exports.createPost = async (req, res) => {
  console.log('Inside createPost function');
  const { title, category, description, name, role } = req.body; // Include all required fields
  console.log('Request body:', req.body);

  try {
    // Handle file upload (if thumbnail is being uploaded)
    let thumbnailPath = null;
    if (req.file) {
      thumbnailPath = req.file.path; // Save the file path of uploaded thumbnail
      console.log('Uploaded file path:', thumbnailPath);
    }

    // Validate required fields
    if (!title || !description || !name || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create the blog post with all the required fields
    const newPost = new Blog({
      title,
      category: category || 'Uncategorized', // Use default if not provided
      description,
      name,
      role,
      thumbnail: thumbnailPath // Include the thumbnail path
    });

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
