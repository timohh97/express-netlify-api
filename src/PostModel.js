const mongoose = require("mongoose")

const PostPattern = mongoose.Schema({
    username: {
       type: String,
       required:true
    },
    password: {
        type: String,
        required:true
     }
})


module.exports = mongoose.model("Posts", PostPattern)