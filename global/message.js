const CONSTANTS = require("./constants");

module.exports = {
    // General Error Messages
    ERROR_DATABASE: "Unable to write to database",
    ERROR_TITLE: `Title length should be ${CONSTANTS.BLOG_TITLE_LENGTH.min} to ${CONSTANTS.BLOG_TITLE_LENGTH.max} characters long.`,
    ERROR_DESCRIPTION: `Description should be ${CONSTANTS.BLOG_DESCRIPTION_LENGTH.min} to ${CONSTANTS.BLOG_DESCRIPTION_LENGTH.max} characters long.`,
    ERROR_LOCATION: "Location cannot be empty.",
    ERROR_IMAGE_FILE_EMPTY: "Image File cannot be empty",
    
    INVALID_IMAGE_MIMETYPE: "Invalid image file mimetype.",
    INVALID_BLOG_ID: "Blog id invalid.",

    // General Success Messages
    SUCCESS_BLOG_CREATED: "Blog has been created successfully.",
    SUCCESS_ALL_BLOGS_FOUND: "All blogs have been found successfully.",
    SUCCESS_BLOG_VIEW_INCREMENTED: "Blog view has been incremented.",
    SUCCESS_HOMEPAGE_BLOGS_FOUND: "All homepage blogs have been found successfully."
}