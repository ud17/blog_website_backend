require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const blogs = require("./routes/blog");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;

// Config options to pass in mongoose.connect() method
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Routes
//app.use('/blog' , blogs);

// mongodb connection
mongoose.connect( URL, options ).then((result) => {
    app.listen(PORT , (req , res) => {
        console.log(`Server has started successfully on port : ${PORT}`);
    })
})
.catch((err) => {
    console.log(`Server error -> ${err}`);
});