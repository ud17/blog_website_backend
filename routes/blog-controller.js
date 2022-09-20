const { ObjectId } = require('mongodb');
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

// get home page blogs
const getHomePageBlogs = async () => {

    let latest, mostViewed, result = {};
    // show 10 blogs at a time
    const BLOG_LIMIT = 10;

    // get latest blogs
    latest = await BlogHelper.getLatestBlogs({}, BLOG_LIMIT);

    // get most viewed blogs
    mostViewed = await BlogHelper.getMostViewedBlogs({}, BLOG_LIMIT);

    if(latest.databaseError || mostViewed.databaseError) {
        result.databaseError = true;
        return result;
    }

    result.latest = latest.latest;
    result.most_viewed = mostViewed.most_viewed;
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

// update blog details
const updateBlog = async (blog_id, req) => {

    let updatedBlog, result = {};

    let query = {
        _id: ObjectId(blog_id)
    }

    let newData = {
        title: req.body.title,
        description: req.body.description,
        location: req.body.location,
        file: req.file
    };

    updatedBlog = await BlogHelper.updateBlog(query, newData);

    if(updatedBlog.databaseError) {
        result.databaseError = true;
        return result;
    }

    result.blog = updatedBlog.blog;
    return result;
}


// delete a blog
const deleteBlog = async (blog_id) => {

    let blog, result = {};
    let query = {
        _id: ObjectId(blog_id)
    }

    // method call to delete a blog
    blog = await BlogHelper.deleteBlog(query);

    if(blog.databaseError) {
        result.databaseError = true;
        return result;
    } 
    else if (blog.blogNotFound) {
        result.blogNotFound = true;
        return result;
    }

    result.blogDeleted = blog.blogDeleted;
    return result;
}

module.exports = {
    getAllBlogs,
    createNewBlog,
    updateBlog,
    deleteBlog,
    incrementBlogViewByOne,
    getHomePageBlogs
}