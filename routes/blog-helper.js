const Blog = require("../model/Blog");

// add new blog
const createNewBlog = async (query) => {

    let blog, result = {};

    try {
        
        blog = await new Blog(query).save();
    } catch (err) {
        result.databaseError = true;
        return result;
    }

    result.blogDetails = blog;
    return result;
}

module.exports = {
    createNewBlog
}