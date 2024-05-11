const mongoose = require("mongoose")
const Schema = mongoose.Schema

const todoSchema = new Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
}, {
    timestamps: true,
})

module.exports = mongoose.model("Tasks", todoSchema)