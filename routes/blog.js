const express = require("express");
const Response = require("../global/response.js");
const ResponseCode = require("../global/code.js");
const ResponseMessage = require("../global/message.js");

// Controller
const blogController = require("./blog-controller.js");

const router = express.Router();

module.exports = router;