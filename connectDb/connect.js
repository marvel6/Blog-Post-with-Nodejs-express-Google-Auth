const mongoose = require('mongoose')
mongoose.set('strictQuery',true)

module.exports = (url) => {
    return mongoose.connect(url)
}