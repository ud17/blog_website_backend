const mongoose = require("mongoose");

const Blog = new mongoose.Schema({
    title : {
        type: String
    },

    description : {
        type: String
    },

    image: {
        type: String
    },

    location: {
        type: String
    },

    views: {
        type: Number
    }
} , {timestamps: true});

module.exports = mongoose.model("Blog", Blog);