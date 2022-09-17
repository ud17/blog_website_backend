const fs = require("fs");

// Remove files if exists
const removeImageFileIfExists = async (file) => {
    if(file) {

        fs.unlink(file.path, (err) => {
            if(err) console.log(`Error while deleing image : ${err}`);
            else console.log(`File deleted.`);
        })
    } else return false;
}

module.exports = {
    removeImageFileIfExists
}