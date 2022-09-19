const { query } = require("express");
const Blog = require("../model/Blog");

// get all blog
const getAllBlogs = async (query) => {

    let blog, result = {}

    try {
        blog = await Blog.find(query);
    } catch(err) {
        console.log(err);
        result.databaseError = true;
        return result;
    }

    result.blogs = blog;
    return result;
}

// add new blog
const createNewBlog = async (query) => {

    let blog, result = {};

    try {        
        blog = await new Blog(query).save();
    } catch (err) {
        console.log(err);
        result.databaseError = true;
        return result;
    }

    result.blog_details = blog;
    return result;
}

// increment blog views
const incrementBlogViewByOne = async (query) => {

    let blog, result = {};

    try {
        blog = await Blog.findOneAndUpdate(query, 
            { $inc: {
                views : 1
            }},
            {
                returnOriginal: false
            }
        );
    } catch (err) {
        console.log(err);
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