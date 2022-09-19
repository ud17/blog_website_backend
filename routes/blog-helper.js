const Blog = require("../model/Blog");

// get all blogs
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

// get latest blogs
const getLatestBlogs = async (query, limit) => {

    let latest, result = {};

    try {
        latest = await Blog.find(query).sort({"createdAt": -1}).limit(limit);

    } catch (err) {
        console.log(err);
        result.databaseError = true;
        return result;
    }

    result.latest = latest;
    return result;
}

// get most viewed blogs
const getMostViewedBlogs = async (query, limit) => {
    let mostViewed, result = {};

    try {
        mostViewed = await Blog.find(query).sort({"views" : -1}).limit(limit);

    } catch (err) {
        console.log(err);
        result.databaseError = true;
        return result;
    }

    result.most_viewed = mostViewed;
    return result;
}

module.exports = {
    getAllBlogs,
    createNewBlog,
    incrementBlogViewByOne,
    getLatestBlogs,
    getMostViewedBlogs
}