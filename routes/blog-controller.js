const Blog = require("../model/Blog.js");
const BlogHelper = require("./blog-helper.js");

// getAllBlogs
const getAllBlogs = async () => {

}

// create new blog
const createNewBlog = async ({title, description, location, file}) => {

    let blog, result = {};

    let query = {
        title: title,
        description: description,
        location: location,
        image: file.path,
        views: 0
    }

    // create new blog
    blog = await BlogHelper.createNewBlog(query);

    if(blog.databaseError) {
        result.databaseError = true;
        return result;
    }

    result.blogDetails = blog;
    return result;
}


module.exports = {
    createNewBlog
}