const mongoose = require('mongoose')

const users = {
    email: String,
    firstName: String,
    _id: mongoose.Schema.Types.ObjectId
}

module.exports = mongoose.model("users", users)