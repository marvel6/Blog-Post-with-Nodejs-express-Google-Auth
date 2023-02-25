const mongoose = require('mongoose')


const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public',
        enum: ["public", "private"]
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }




})


module.exports = mongoose.model('Blogs',BlogSchema)