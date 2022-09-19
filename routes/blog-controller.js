const Blog = require("../model/Blog.js");
const BlogHelper = require("./blog-helper.js");

// get all blogs
const getAllBlogs = async () => {

    let blog, result = {};

    // get all blogs
    blog = await BlogHelper.getAllBlogs({});
    
    if(blog.databaseError) {
        result.databaseError = true;
        return result;
    }

    result.blogs = blog;
    return result;
}

// create new blog
const createNewBlog = async (req) => {

    let blog, result = {};
    const {title, description, location} = req.body;

    let query = {
        title: title,
        description: description,
        location: location,
        image: req.file.path,
        views: 0
    }

    // create new blog
    blog = await BlogHelper.createNewBlog(query);

    if(blog.databaseError) {
        result.databaseError = true;
        return result;
    }

    result.blog_details = blog;
    return result;
}

// increment blog views
const incrementBlogViewByOne = async (blog_id) => {

    let blog, result = {};

    let query = {
        _id: blog_id 
    };

    // increment blog views method
    blog = await BlogHelper.incrementBlogViewByOne(query);

    if(blog.databaseError) {
        result.databaseError = true;
        return result;
    }

    result.blog = blog;
    return result;
}


module.exports = {
    getAllBlogs,
    createNewBlog,
    incrementBlogViewByOne
}