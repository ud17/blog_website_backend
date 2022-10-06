require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

// Import routes
const blogs = require("./routes/blog");

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const URL = process.env.MONGO_URL;
const VERSION = process.env.VERSION;
const PORT = process.env.PORT;

// Config options to pass in mongoose.connect() method
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Routes
app.use("/uploads" , express.static(path.join(__dirname, "uploads")))
app.use("/blog" , blogs);

// home route
app.get("/", (req, res) => {
    res.send(`Welcome to Blog Node JS App Backend!\nVersion: ${VERSION}`);
});

// Error handling route
app.all("*", (req, res) => {
    res.status(404).send("Error 404!. Page not found!");
})

// mongodb connection
mongoose.connect( URL, options ).then((result) => {
    app.listen(PORT , (req , res) => {
        console.log(`Server has started successfully on port : ${PORT}`);
    })
})
.catch((err) => {
    console.log(`Server error -> ${err}`);
});