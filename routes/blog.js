const express = require("express");
const Response = require("../global/response.js");
const ResponseCode = require("../global/code.js");
const ResponseMessage = require("../global/message.js");
const CONSTANT = require("../global/constants.js");
const FileUpload = require("../middleware/upload-blog.js");
const { removeImageFileIfExists } = require("../middleware/check-file.js")
const { checkImageMimeType } = require("../middleware/check-mimetype.js")
const { body, validationResult } = require('express-validator');

// Controller
const BlogController = require("./blog-controller.js");
const { query } = require("express");

const router = express.Router();

// path - /blog/get-all-blogs
// GET
router.get("/get-all-blogs" ,

    async(req , res, next) => {

        const response = await BlogController.getAllBlogs();

        // send database error is exists
        if(response.databaseError) return Response.error( res, ResponseCode.DATABASE_ERROR, ResponseMessage.ERROR_DATABASE);

        // send success response
        else if(response.blogs) return Response.success( res, ResponseCode.SUCCESS, ResponseMessage.SUCCESS_ALL_BLOGS_FOUND, response.blogs);
    }
)

// path - /blog/create-blog
// POST
router.post("/create-blog" ,

    // Middleware to check file upload
    FileUpload.single("image"),

    // Parameter Validators
    [
        body("title").isLength(CONSTANT.BLOG_TITLE_LENGTH).withMessage( ResponseMessage.ERROR_TITLE ),
        body("description").isLength(CONSTANT.BLOG_DESCRIPTION_LENGTH).withMessage( ResponseMessage.ERROR_DESCRIPTION ),
        body("location").notEmpty().withMessage( ResponseMessage.ERROR_LOCATION )
    ],

    async(req , res, next) => {

        // check if params are valid
        const errors = validationResult(req)

        if(!errors.isEmpty()) {

            // Remove file if exists
            removeImageFileIfExists(req.file);

            return Response.error(res , ResponseCode.BAD_REQUEST , errors.array().map((error) => ({
                field: error.param,
                errorMessage: error.msg
            })));            
        }

        // check if imageFile is passed
        if( !req.file ) return Response.error( res , ResponseCode.UNPROCESSABLE_ENTITY , ResponseMessage.ERROR_IMAGE_FILE_EMPTY );

        // check image file mimetype
        if(req.file) {
            // check image file mimetype
            const isImageFileValid = await checkImageMimeType(req.file)

            if ( !isImageFileValid ){ 
                // Remove file if exists
                removeImageFileIfExists(req.file)
                
                return Response.error( res , ResponseCode.UNPROCESSABLE_ENTITY , ResponseMessage.INVALID_IMAGE_MIMETYPE ); 
            }
        }

        // method to create new blog
        const response = await BlogController.createNewBlog(req);

        // send database error if exists
        if(response.databaseError) {
            // remove image file
            removeImageFileIfExists(req.file);

            return Response.error( res, ResponseCode.DATABASE_ERROR, ResponseMessage.ERROR_DATABASE )
        }
        
        // send success response if blog created
        else if( response.blog_details ) return Response.success( res, ResponseCode.SUCCESS, ResponseMessage.SUCCESS_BLOG_CREATED, response.blog_details );
    }
)

module.exports = router;